# 🧪 Theme System Testing Guide

## Quick Test (2 minutes)

### ✅ Test 1: Toggle Theme
1. Visit `http://localhost:3000`
2. Look for the **Moon icon** 🌙 in the header (top right)
3. Click the Moon icon
4. **Expected Results:**
   - Icon animates and changes to **Sun icon** ☀️
   - Background changes from **black to white**
   - Text changes from **white to black**
   - All components adapt to light theme
   - Transition is smooth (300ms)

### ✅ Test 2: Toggle Back to Dark
1. Click the Sun icon ☀️
2. **Expected Results:**
   - Icon animates and changes to **Moon icon** 🌙
   - Background changes from **white to black**
   - Text changes from **black to white**
   - All components adapt to dark theme

### ✅ Test 3: Persistence (Refresh)
1. Toggle to **light mode** (Sun icon visible)
2. **Refresh the page** (F5 or Ctrl+R)
3. **Expected Results:**
   - Page loads in **light mode**
   - No flash of dark theme
   - Sun icon is visible
   - Theme persisted correctly

### ✅ Test 4: Persistence (Close & Reopen)
1. Toggle to **light mode**
2. **Close the browser tab**
3. **Open a new tab** and visit `http://localhost:3000`
4. **Expected Results:**
   - Page loads in **light mode**
   - Theme persisted across sessions
   - Sun icon is visible

### ✅ Test 5: No Flash on Load
1. Set theme to **light mode**
2. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Watch carefully** as page loads
4. **Expected Results:**
   - No flash of dark theme
   - Page loads directly in light mode
   - Smooth, instant theme application

## Detailed Testing

### Test Different Pages

#### Homepage
1. Toggle theme on homepage
2. Check hero section background
3. Check navigation bar
4. Check footer
5. **All should adapt to theme**

#### Dashboard
1. Navigate to `/dashboard`
2. Toggle theme
3. Check cards and stats
4. Check charts and graphs
5. **All should adapt to theme**

#### Auth Pages
1. Visit `/auth/signin`
2. Toggle theme
3. Check form inputs
4. Check buttons
5. **All should adapt to theme**

#### Learn Page
1. Visit `/learn`
2. Toggle theme
3. Check course cards
4. Check feature sections
5. **All should adapt to theme**

### Test Components

#### Glass Morphism
1. Toggle to **dark mode**
2. Look for glass elements (cards, modals)
3. **Expected:** Semi-transparent with blur
4. Toggle to **light mode**
5. **Expected:** White/light background with blur

#### Buttons
1. Toggle theme
2. Check primary buttons
3. Check secondary buttons
4. Check ghost buttons
5. **All should have appropriate colors**

#### Navigation
1. Toggle theme
2. Check header background
3. Check navigation links
4. Check user menu dropdown
5. **All should adapt**

### Test Animations

#### Icon Animation
1. Click theme toggle
2. **Watch the icon:**
   - Should rotate 90 degrees
   - Should fade out/in
   - Should scale smoothly
   - Duration: ~300ms

#### Background Transition
1. Click theme toggle
2. **Watch the background:**
   - Should fade smoothly
   - No jarring changes
   - Duration: ~300ms

### Test Edge Cases

#### Rapid Toggling
1. Click theme toggle **10 times rapidly**
2. **Expected:**
   - No errors in console
   - Theme settles on final state
   - No visual glitches

#### Multiple Tabs
1. Open **two tabs** of the site
2. Toggle theme in **Tab 1**
3. Refresh **Tab 2**
4. **Expected:**
   - Tab 2 loads with same theme as Tab 1
   - localStorage synced

#### localStorage Cleared
1. Open DevTools (F12)
2. Go to Application > Local Storage
3. Delete `codeaxis-theme` key
4. Refresh page
5. **Expected:**
   - Falls back to default theme (dark)
   - Or matches system preference

## Browser Testing

### Desktop Browsers
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile
- [ ] Samsung Internet

## Accessibility Testing

### Keyboard Navigation
1. Press **Tab** until theme toggle is focused
2. Press **Enter** or **Space**
3. **Expected:** Theme toggles

### Screen Reader
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate to theme toggle
3. **Expected:** Announces "Toggle theme" or similar
4. Activate toggle
5. **Expected:** Announces theme change

### High Contrast Mode
1. Enable Windows High Contrast
2. Toggle theme
3. **Expected:** Still functional and visible

## Performance Testing

### Load Time
1. Open DevTools Network tab
2. Hard refresh
3. **Check:**
   - Theme applies before content loads
   - No layout shift
   - No flash of wrong theme

### Animation Performance
1. Open DevTools Performance tab
2. Start recording
3. Toggle theme 5 times
4. Stop recording
5. **Check:**
   - Smooth 60fps animations
   - No dropped frames
   - No memory leaks

## Console Checks

### No Errors
1. Open DevTools Console
2. Toggle theme multiple times
3. **Expected:** No errors or warnings

### localStorage
1. Open DevTools Application tab
2. Check Local Storage
3. **Expected:** `codeaxis-theme` key exists
4. **Value:** Either "light" or "dark"

## Visual Regression

### Dark Mode Checklist
- [ ] Background is pure black (#000000)
- [ ] Text is white (#ffffff)
- [ ] Moon icon is visible and blue
- [ ] Glass elements have white/5 opacity
- [ ] Borders are white/10 opacity
- [ ] Hover states work correctly

### Light Mode Checklist
- [ ] Background is pure white (#ffffff)
- [ ] Text is black (#000000)
- [ ] Sun icon is visible and yellow
- [ ] Glass elements have white/80 opacity
- [ ] Borders are gray-200
- [ ] Hover states work correctly

## Test Results Template

```
Date: ___________
Browser: ___________
OS: ___________

[ ] Toggle functionality works
[ ] Icon switches correctly (Moon ↔ Sun)
[ ] Background changes smoothly
[ ] Theme persists on refresh
[ ] Theme persists after browser close
[ ] No flash on page load
[ ] All pages adapt to theme
[ ] All components adapt to theme
[ ] Animations are smooth
[ ] No console errors
[ ] Keyboard accessible
[ ] Screen reader compatible

Issues Found:
_________________________________
_________________________________
_________________________________

Overall Status: [ ] PASS [ ] FAIL
```

## Common Issues & Solutions

### Issue: Theme not persisting
**Check:**
- Browser allows localStorage
- No browser extensions blocking storage
- Correct storage key in code

### Issue: Flash of wrong theme
**Check:**
- Script in `<head>` is present
- Script runs before React hydration
- localStorage key matches

### Issue: Icon not switching
**Check:**
- Theme state is updating
- AnimatePresence is working
- No CSS conflicts

### Issue: Smooth transition not working
**Check:**
- Global CSS transitions are applied
- No `transition: none` overrides
- Browser supports CSS transitions

## Success Criteria

✅ All tests pass
✅ No console errors
✅ Smooth animations
✅ Theme persists correctly
✅ No visual glitches
✅ Accessible to all users
✅ Works in all browsers
✅ Works on all devices

---

**Status:** Ready for testing
**Expected Duration:** 5-10 minutes for full test
**Quick Test:** 2 minutes
