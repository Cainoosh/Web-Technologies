# Midterm Lab Submission

- **Student Name:** Cainoosh Khan
- **Registration Number:** FA24-BCS-029
- **N:** 29
- **BP (Breakpoint):** 629px
- **H (Accent Hue):** 203 (hsl(203, 70%, 45%))
- **K (Mega-Menu Columns):** 5
- **Max Quantity Limit per Product:** 3

## Files Changed / Created
- `home.html` (Added Task 1 Mega-Menu & Mobile Accordion, Task 3 Cart Badge & Mini-Cart Panel)
- `product.html` (Updated navbar links)
- `checkout.html` (Created HTML5 validated checkout form with CSS Grid layout)
- `style.css` (Added CSS for Mega-Menu, Checkout Form Grid & Validation, Mini-Cart Panel)
- `script.js` (Created JS logic for Cart Array, Quantity Limit, Mini-Cart toggle, and reduce() total)

## Task Summaries

### Task 1 - Mega-Menu
- Created a 5-column mega-menu panel under "SHOP BY CATEGORY" using CSS Grid.
- Opens via `:hover` and keyboard `:focus-within` on desktop viewports (>=629px).
- Transformed into semantic `<details>` and `<summary>` accordions inside the mobile sidebar for screens below 629px.

### Task 2 - Checkout Form (`checkout.html`)
- Built `checkout.html` containing "Contact" and "Delivery" `<fieldset>`s.
- Applied HTML5 validation using `pattern="03[0-9]{2}-[0-9]{7}"` for phone and date constraints (`min="2026-10-29"`, `max="2026-11-27"`).
- Styled validation states with pure CSS `:user-invalid` without JavaScript.
- Formatted with CSS Grid: 2-column side-by-side fieldsets above 629px, collapsing to 1 column below 629px.

### Task 3 - JavaScript Cart & Mini-Cart
- Implemented `script.js` managing cart items in a JavaScript array.
- Enforced a product quantity limit of 3; button updates to "Limit reached" and disables when maxed out.
- Implemented a toggleable mini-cart panel with dynamic removal and total price calculations using `Array.prototype.reduce()`.

## AI Tools Used
- Gemini