// What things cost, in cents.
export const PRICES = { mug: 100 };

export const subtotal = (items) => items.reduce((sum, item) => sum + PRICES[item], 0);

// CR-1: discount codes.
export const CODES = { SAVE10: 0.1 };

export const discount = (total, code) => Math.round(total * (1 - (CODES[code] ?? 0)));
