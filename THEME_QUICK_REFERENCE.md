# 🎨 Theme System - Quick Reference

## 🚀 Quick Start

### Toggle Theme
**Location:** Header (top right)
**Icon:** Moon 🌙 (dark mode) / Sun ☀️ (light mode)
**Action:** Click to toggle

### Current Theme
- **Moon icon visible** = Dark mode active
- **Sun icon visible** = Light mode active

## 💾 Persistence

### Automatic Saving
- ✅ Saves on every toggle
- ✅ Persists on refresh
- ✅ Persists after browser close
- ✅ Syncs across tabs

### Storage Location
```
localStorage['codeaxis-theme'] = 'dark' | 'light'
```

## 🎯 For Users

### Switch to Light Mode
1. Look for **Moon icon** 🌙 in header
2. Click it
3. Background turns white
4. Icon changes to **Sun** ☀️

### Switch to Dark Mode
1. Look for **Sun icon** ☀️ in header
2. Click it
3. Background turns black
4. Icon changes to **Moon** 🌙

## 👨‍💻 For Developers

### Use Theme in Components
```typescript
import { useTheme } from '@/components/theme/theme-provider'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="bg-white dark:bg-black">
      Theme: {theme}
    </div>
  )
}
```

### Tailwind Classes
```tsx
<div className="
  bg-white dark:bg-black
  text-black dark:text-white
  border-gray-200 dark:border-white/10
">
  Content
</div>
```

### Check Current Theme
```typescript
const { theme } = useTheme()
if (theme === 'dark') {
  // Dark mode logic
} else {
  // Light mode logic
}
```

## 🎨 Theme Colors

### Dark Mode
```css
Background: #000000
Text: #ffffff
Icon: Blue Moon 🌙
Glass: bg-white/5
Border: border-white/10
```

### Light Mode
```css
Background: #ffffff
Text: #000000
Icon: Yellow Sun ☀️
Glass: bg-white/80
Border: border-gray-200
```

## ⚡ Features

- ✅ Global (entire website)
- ✅ Persistent (localStorage)
- ✅ No flash on load
- ✅ Smooth transitions (300ms)
- ✅ Accessible (keyboard + screen reader)
- ✅ Performant (60fps)

## 🧪 Quick Test

```bash
# 1. Toggle theme
Click Moon/Sun icon

# 2. Check persistence
Refresh page → Theme persists

# 3. Check localStorage
DevTools → Application → Local Storage
Key: codeaxis-theme
Value: "dark" or "light"
```

## 🐛 Troubleshooting

### Theme not changing?
```bash
1. Check console for errors
2. Clear localStorage
3. Hard refresh (Ctrl+Shift+R)
```

### Flash on load?
```bash
1. Check script in <head>
2. Verify localStorage key
3. Clear browser cache
```

### Icon not switching?
```bash
1. Check theme state
2. Verify AnimatePresence
3. Check CSS conflicts
```

## 📱 Keyboard Shortcuts

```
Tab → Focus theme toggle
Enter/Space → Toggle theme
```

## 🔧 Configuration

### Change Default Theme
```typescript
// app/layout.tsx
<ThemeProvider defaultTheme="light">
```

### Change Storage Key
```typescript
<ThemeProvider storageKey="my-theme">
```

## 📊 Performance

- Initial load: < 50ms
- Toggle time: < 300ms
- Animation: 60fps
- Bundle size: ~3KB

## 🎯 Best Practices

### DO ✅
- Use Tailwind `dark:` classes
- Test in both themes
- Ensure contrast ratios
- Provide theme toggle

### DON'T ❌
- Hardcode colors
- Skip dark mode styles
- Forget accessibility
- Override transitions

## 📚 Documentation

- **Full Docs:** THEME_SYSTEM.md
- **Testing:** TEST_THEME.md
- **Summary:** THEME_UPDATE_SUMMARY.md

## 🎉 That's It!

**Simple:** Click Moon/Sun to toggle
**Smart:** Remembers your choice
**Smooth:** Beautiful transitions
**Fast:** Instant response

---

**Quick Access:** Header → Top Right → Moon/Sun Icon
