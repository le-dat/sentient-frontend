# Responsive Test Checklist

Use this checklist before merging UI/responsive PRs.

## Viewports
- Mobile: 375x812 (iPhone X)
- Mobile large: 430x932
- Tablet: 768x1024
- Desktop: 1440x900

## Pages to verify

### 1) Landing (`/`)
- Navbar does not overlap logo/buttons
- Hero headline wraps correctly (no horizontal scroll)
- Search input + button stack correctly on mobile
- Stats cards display 2 per row on mobile

### 2) Dashboard (`/dashboard`)
- Chain cards and vault cards wrap with consistent gaps
- Header/top nav remains usable on small screens
- Open vault side panel on mobile and ensure content is readable

### 3) Query root (`/dashboard/search`)
- Search header scales down on mobile
- Search bar remains visible and fully usable

### 4) Query detail (`/dashboard/search/[address]`)
- 3-column detail layout collapses to 1 column on mobile
- No clipped text for address/history rows
- Back button remains visible

### 5) Notifications (`/dashboard/notifications`)
- Connections + preferences + recent notifications stack properly
- Buttons are clickable and not clipped

## Basic checks
- No horizontal scrollbar on any page
- No button/input clipped at viewport edges
- No overlapping fixed elements (nav/panel/modal)
