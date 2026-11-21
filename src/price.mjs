// What things cost, in cents.
export const PRICES = { mug: 100 };

export const subtotal = (items) => items.reduce((sum, item) => sum + PRICES[item], 0);
