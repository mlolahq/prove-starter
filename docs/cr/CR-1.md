# CR-1: Discount codes

A shopper can enter the code **SAVE10** on the cart page to take 10% off the
total.

- SAVE10 takes 10% off the total.
- An unknown code changes nothing.
- After applying it, the page shows the discounted total.
- The discount is kept on the cart: `GET /api/cart` returns the discounted
  total, so checkout charges it.
- The brand team approves the wording.
