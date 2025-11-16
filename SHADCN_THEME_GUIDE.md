# 🎨 Shadcn Dark Mode Implementation

## Overview

The CodeAxis platform now uses **shadcn/ui's dark mode system** with CSS variables for better color management and smoother theme transitions.

## Key Features

✅ **CSS Variables** - All colors defined as HSL variables
✅ **Automatic Color Adaptation** - Components automatically adapt to theme
✅ **Smooth Transitions** - Seamless color changes
✅ **localStorage Persistence** - Theme preference saved
✅ **No FOUC** - Instant theme application
✅ **Sun/Moon Toggle** - Intuitive icon switching

## How It Works

### 1. CSS Variables (HSL Format)

All colors are defined as HSL (Hue, Saturation, Lightness) values in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;        /* White */
  --foreground: 0 0% 3.9%;        /* Near Black */
  --primary: 0 0% 9%;             /* Dark Gray */
  --secondary: 0 0% 96.1%;        /* Light Gray */
  /* ... more variables */
}

.dark {
  --background: 0 0% 0%;          /* Black */
  --foreground: 0 0% 98%;         /* Near White */
  --primary: 0 0% 98%;            /* Light Gray */
  --secondary: 0 0% 14.9%;        /* Dark Gray */
  /* ... more variables */
}
```

### 2. Tailwind Integration

Colors are automatically available in Tailwind:

```tsx
<div className="bg-background text-foreground">
  {/* Automatically adapts to theme */}
</div>

<button className="bg-primary text-primary-foreground">
  {/* Uses theme colors */}
</button>
```

### 3. Available Color Variables

#### Background & Foreground
- `bg-background` / `text-foreground` - Main page colors
- `bg-card` / `text-card-foreground` - Card backgrounds
- `bg-popover` / `text-popover-foreground` - Popover/dropdown colors

#### Interactive Elements
- `bg-primary` / `text-primary-foreground` - Primary buttons
- `bg-secondary` / `text-secondary-foreground` - Secondary buttons
- `bg-accent` / `text-accent-foreground` - Accent elements
- `bg-muted` / `text-muted-foreground` - Muted/disabled elements

#### Feedback
- `bg-destructive` / `text-destructive-foreground` - Error/delete actions

#### Borders & Inputs
- `border-border` - Border color
- `border-input` - Input border color
- `ring-ring` - Focus ring color

## Usage Examples

### Basic Component
```tsx
<div className="bg-card text-card-foreground rounded-lg border border-border p-6">
  <h2 className="text-foreground">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Button
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
  Click Me
</button>
```

### Input
```tsx
<input 
  className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-ring"
  placeholder="Enter text..."
/>
```

### Card with Glass Effect
```tsx
<div className="glass rounded-xl p-6">
  {/* Automatically adapts glass effect to theme */}
</div>
```

## Theme Toggle

### Location
Header (top right corner)

### Icons
- **Dark Mode** → Moon 🌙 (blue)
- **Light Mode** → Sun ☀️ (yellow)

### Behavior
Click to toggle between light and dark modes

## Color Customization

### Changing Theme Colors

Edit `app/globals.css`:

```css
:root {
  /* Change light mode primary color */
  --primary: 220 90% 56%;  /* Blue */
}

.dark {
  /* Change dark mode primary color */
  --primary: 220 90% 56%;  /* Blue */
}
```

### HSL Format
```
--variable: H S% L%;
```
- **H** (Hue): 0-360 (color wheel)
- **S** (Saturation): 0-100% (color intensity)
- **L** (Lightness): 0-100% (brightness)

### Example Colors
```css
/* Red */
--destructive: 0 84.2% 60.2%;

/* Blue */
--primary: 220 90% 56%;

/* Green */
--success: 142 76% 36%;

/* Gray */
--muted: 0 0% 96.1%;
```

## Component Adaptation

### Automatic Adaptation
Components using Tailwind classes automatically adapt:

```tsx
// This component works in both themes
<div className="bg-background text-foreground border border-border">
  Content
</div>
```

### Manual Theme Check
```tsx
import { useTheme } from '@/components/theme/theme-provider'

function MyComponent() {
  const { theme } = useTheme()
  
  return (
    <div>
      Current theme: {theme}
    </div>
  )
}
```

## Glass Morphism

Glass effects automatically adapt to theme:

```tsx
<div className="glass">
  {/* Light mode: bg-background/80 with light border */}
  {/* Dark mode: bg-background/80 with dark border */}
</div>
```

## Migration from Old System

### Before (Manual Classes)
```tsx
<div className="bg-white dark:bg-black text-black dark:text-white">
  Content
</div>
```

### After (CSS Variables)
```tsx
<div className="bg-background text-foreground">
  Content
</div>
```

## Benefits

### 1. Consistency
All components use the same color system

### 2. Maintainability
Change colors in one place (CSS variables)

### 3. Performance
No JavaScript color calculations

### 4. Flexibility
Easy to add new themes or color schemes

### 5. Accessibility
Proper contrast ratios maintained

## Testing

### Quick Test
1. Visit `http://localhost:3000`
2. Click Moon/Sun icon in header
3. **Expected:** All colors change smoothly
4. **Expected:** Icon switches
5. Refresh page
6. **Expected:** Theme persists

### Color Test
Check these elements adapt correctly:
- [ ] Page background
- [ ] Text color
- [ ] Card backgrounds
- [ ] Button colors
- [ ] Border colors
- [ ] Input fields
- [ ] Glass effects
- [ ] Hover states

## Troubleshooting

### Colors Not Changing
1. Check CSS variables are defined
2. Verify Tailwind config includes CSS variables
3. Clear browser cache

### Wrong Colors
1. Check HSL values in CSS
2. Verify light/dark classes
3. Check Tailwind class names

### Theme Not Persisting
1. Check localStorage
2. Verify theme provider is wrapping app
3. Check storage key matches

## Advanced Usage

### Custom Color Scheme
```css
:root {
  --background: 210 40% 98%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
}
```

### Multiple Themes
```tsx
// Add more theme options
type Theme = 'dark' | 'light' | 'blue' | 'green'
```

### Theme-Specific Styles
```tsx
<div className="bg-background dark:shadow-lg light:shadow-md">
  Content
</div>
```

## Best Practices

### DO ✅
- Use CSS variable classes (`bg-background`, `text-foreground`)
- Test in both light and dark modes
- Maintain proper contrast ratios
- Use semantic color names

### DON'T ❌
- Hardcode colors (`bg-white`, `text-black`)
- Skip dark mode testing
- Use low contrast colors
- Override theme colors unnecessarily

## Color Reference

### Light Mode
```
Background: White (#FFFFFF)
Foreground: Near Black (#0A0A0A)
Primary: Dark Gray (#171717)
Secondary: Light Gray (#F5F5F5)
Border: Light Gray (#E5E5E5)
```

### Dark Mode
```
Background: Black (#000000)
Foreground: Near White (#FAFAFA)
Primary: Light Gray (#FAFAFA)
Secondary: Dark Gray (#262626)
Border: Dark Gray (#262626)
```

## Summary

✅ **CSS Variables** - HSL-based color system
✅ **Automatic Adaptation** - Components adapt to theme
✅ **Easy Customization** - Change colors in one place
✅ **Smooth Transitions** - Beautiful color changes
✅ **Persistent** - Theme saved in localStorage
✅ **Accessible** - Proper contrast maintained

---

**Status:** ✅ Fully Implemented
**System:** shadcn/ui dark mode
**Format:** HSL CSS Variables
**Toggle:** Sun/Moon icon in header
