# DMD Furnishing Website CSS Architecture

## Overview

This document outlines the new CSS architecture implemented across the DMD Furnishing website. The goal is to create a consistent, maintainable, and scalable CSS structure that ensures design consistency across all pages.

## Key Components

### 1. Global CSS Variables (`variables.css`)

This file contains all shared design tokens including:

- Color variables
- Spacing variables
- Typography variables
- Border radius values
- Transition effects
- Container widths
- Common section styles

### 2. Refactored Page-Specific CSS Files

Each page has its own CSS file that imports the global variables:

- `Home-refactored.css`
- `AboutUs-refactored.css`
- `Services-refactored.css`
- `Contact-refactored.css`
- `Products-refactored.css`

## Implementation Guide

### How to Use the New CSS Architecture

1. **Import the variables file** at the top of each CSS file:
   ```css
   @import './variables.css';
   ```

2. **Replace hardcoded values** with CSS variables:
   - Instead of: `color: #d4af37;`
   - Use: `color: var(--primary-color);`

3. **Use common layout components** from variables.css:
   - `.section-padding`
   - `.section-container`
   - `.section-title`
   - `.btn`, `.btn-primary`, `.btn-outline`

### Benefits

- **Consistency**: Changing a variable in one place affects all pages
- **Maintainability**: Easier to update design system-wide
- **Efficiency**: Reduces duplicate code across files
- **Responsive Design**: Shared breakpoints ensure consistent mobile experience

### Implementation Steps

1. Add the new `variables.css` file to your project
2. Gradually replace each CSS file with its refactored version
3. Update component imports to reference the new CSS files
4. Test thoroughly on all screen sizes

## File Structure

```
src/styles/
├── variables.css           # Global CSS variables
├── Home-refactored.css     # Home page styles
├── AboutUs-refactored.css  # About Us page styles
├── Services-refactored.css # Services page styles
├── Contact-refactored.css  # Contact page styles
├── Products-refactored.css # Products page styles
└── README.md               # This documentation
```

## Modifying the Design System

When you need to make design changes:

1. For **global changes** that should affect the entire site, modify the variables in `variables.css`
2. For **page-specific changes**, modify only that page's CSS file

## Best Practices

- Always use the CSS variables for colors, spacing, and other design tokens
- Follow the established naming conventions for classes
- Maintain the modular structure with clear section separation
- Use comments to document complex styling logic
- Test changes across multiple devices and browsers