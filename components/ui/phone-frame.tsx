export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full transition-transform duration-300 ease-out hover:-translate-y-7">
      {/* Outer bezel */}
      <div className="relative rounded-[44px] border-[6px] border-foreground/10 bg-foreground/5 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Inner shell */}
        <div className="flex min-h-[580px] flex-col overflow-hidden rounded-[38px] bg-[#0d0d12]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <span className="text-xs font-semibold text-white/70">21:54</span>
            {/* Dynamic island */}
            <div className="h-5 w-20 rounded-full bg-black" />
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3 w-4"
                viewBox="0 0 14 10"
                fill="currentColor"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <rect x="0" y="4" width="2" height="6" rx="0.5" />
                <rect x="3" y="2.5" width="2" height="7.5" rx="0.5" />
                <rect x="6" y="1" width="2" height="9" rx="0.5" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" />
              </svg>
              <svg
                className="h-3 w-4"
                viewBox="0 0 15 11"
                fill="currentColor"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <path d="M7.5 2.2C10.2 2.2 12.6 3.4 14.2 5.3L15 4.4C13.2 2.3 10.5 1 7.5 1S1.8 2.3 0 4.4l.8.9C2.4 3.4 4.8 2.2 7.5 2.2z" />
                <path d="M7.5 4.8c1.8 0 3.4.8 4.5 2l.8-.9C11.5 4.5 9.6 3.5 7.5 3.5S3.5 4.5 2.2 5.9l.8.9C4.1 5.6 5.7 4.8 7.5 4.8z" />
                <circle cx="7.5" cy="9" r="1.5" />
              </svg>
              <div className="h-3 w-6 rounded-sm border border-white/50 p-px">
                <div className="h-full w-3/4 rounded-[1px] bg-white/70" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col px-4 pb-5 pt-2">{children}</div>
          {/* Home indicator */}
          <div className="flex justify-center pb-3 pt-1">
            <div className="h-1 w-28 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
