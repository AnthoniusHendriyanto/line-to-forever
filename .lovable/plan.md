

# 💍 Digital Wedding Invitation — "From a LINE Group Chat to Forever"

## Concept
A mobile-first, interactive love story experience that unfolds like scrolling through a smartphone. The opening mimics a LINE chat notification that expands into a cinematic wedding invitation with 13 story sections.

## Design System
- **Colors**: Ivory white, champagne gold (#C9A96E), soft blush (#F4E1D2), LINE green (#06C755) as accents
- **Fonts**: Serif (Playfair Display) for headings, sans-serif (Inter) for body
- **Effects**: Soft gradients, floating particle animations, fade-in-on-scroll transitions

## Sections (Full-screen vertical scroll)

### 1. Opening — LINE Notification Effect
- Screen starts as a phone lock screen with a LINE notification bubble ("You have a new message")
- Tapping "Open Invitation" triggers an animation that expands into the full wedding intro
- Couple names + wedding date fade in elegantly
- Optional music toggle icon

### 2. The Pandemic (2020)
- Minimal section with subtle dark overlay, text fades in: "The world slowed down… but brought us together"

### 3. The LINE Group Chat
- Recreated LINE-style group chat UI (green theme, chat bubbles, profile avatars)
- Messages animate in one by one as user scrolls

### 4. The First Conversation
- Private chat view (LINE-inspired bubbles) showing early messages between the couple
- Smooth transition text below

### 5. From Online to Real Life
- Chat UI morphs/fades into a photo placeholder — visual transition from digital to real

### 6. Falling in Love
- Photo card carousel with romantic overlay text

### 7. The Proposal
- Large hero image placeholder with elegant "He asked. She said yes." text

### 8. Wedding Event Details
- Two elegant cards (Ceremony + Reception) with date, time, location
- "Open Map" button (links to Google Maps)

### 9. Countdown Timer
- Live countdown (days, hours, minutes, seconds) with animated digits

### 10. Photo Gallery
- Horizontal swipe carousel with story-card style images

### 11. RSVP Form
- Mobile-friendly form: name, attendance (yes/no toggle), guest count, message textarea
- Large tap-friendly submit button (local state only, no backend)

### 12. Wedding Gift
- Elegant cards for bank transfer + digital wallet with "Copy" buttons
- Graceful thank-you message

### 13. Closing
- Final romantic text with fade-in animation
- "From a LINE group chat… to the beginning of forever"

## Technical Approach
- Single-page React app with smooth scroll sections
- Intersection Observer for scroll-triggered animations
- CSS animations + Tailwind for all effects
- Placeholder images via `/placeholder.svg`
- All data hardcoded (no backend needed)
- Fully responsive but mobile-first (max-width container centered on desktop)

