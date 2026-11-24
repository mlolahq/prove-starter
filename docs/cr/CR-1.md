# CR-1: Discount codes

A shopper can enter the code **SAVE10** on the cart page (`/`) to take 10% off the total.

- SAVE10 takes 10% off the total.
- An unknown code changes nothing.
- After adding a mug (button "Add a mug", price 100), filling "Discount code" with SAVE10 and clicking "Apply", the page shows "Total: 90".
- The discount is kept on the cart: `GET /api/cart` returns a `total` of 90, so checkout charges it.
- The brand team approves the wording.
