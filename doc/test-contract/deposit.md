import "dotenv/config";
import { JsonRpcProvider, Wallet, Contract, ethers } from "ethers";

const ERC20_ABI = [
"function approve(address spender, uint256 amount) returns (bool)",
"function allowance(address owner, address spender) view returns (uint256)",
"function balanceOf(address account) view returns (uint256)",
"function decimals() view returns (uint8)",
"function symbol() view returns (string)",
];

const VAULT_ABI = [
"function deposit() payable external",
"function deposit(address token, uint256 amount) external",
"function getBalance(address token) view returns (uint256)",
"function owner() view returns (address)",
];

const USDC_BASE_SEPOLIA = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

async function main() {
const provider = new JsonRpcProvider(process.env.BASE_SEPOLIA_RPC_URL!);
const signer = new Wallet(process.env.PRIVATE_KEY_USER!, provider);

if (!process.env.VAULT_ADDRESS)
throw new Error("VAULT_ADDRESS not set. Run pnpm run setup:vault:base-sepolia first.");

const vaultAddress = process.env.VAULT_ADDRESS;
const depositToken = process.env.DEPOSIT_TOKEN ?? process.env.SHIELD_TOKEN ?? USDC_BASE_SEPOLIA;
const depositAmount = BigInt(process.env.DEPOSIT_AMOUNT ?? process.env.SHIELD_AMOUNT ?? "1000000");

const vault = new Contract(vaultAddress, VAULT_ABI, signer);
const token = new Contract(depositToken, ERC20_ABI, signer);

const sym = await token.symbol();
const dec = await token.decimals();
const ownerBal = await token.balanceOf(signer.address);
const vaultBalBefore = await vault.getBalance(depositToken);

console.log(`\nVault: ${vaultAddress}`);
console.log(`Token: ${sym} | Owner: ${ethers.formatUnits(ownerBal, dec)} | Vault before: ${ethers.formatUnits(vaultBalBefore, dec)}`);
console.log(`Deposit: ${ethers.formatUnits(depositAmount, dec)} ${sym}`);

if (ownerBal < depositAmount)
throw new Error(`Not enough ${sym} (have ${ethers.formatUnits(ownerBal, dec)}, need ${ethers.formatUnits(depositAmount, dec)})`);

const allowance = await token.allowance(signer.address, vaultAddress);
if (allowance < depositAmount) {
console.log("\nApproving token...");
await (await token.approve(vaultAddress, depositAmount)).wait();
}

console.log("Depositing...");
await (await vault.deposit(depositToken, depositAmount)).wait();

const after = await vault.getBalance(depositToken);
console.log(`✅ Vault ${sym} balance: ${ethers.formatUnits(after, dec)}`);
}

main().catch((e) => { console.error("❌", e.message); process.exitCode = 1; });
