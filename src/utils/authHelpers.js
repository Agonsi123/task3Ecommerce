export const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
export const isPhoneNumber = (input) => /^\+\d{10,15}$/.test(input);
//e.g: +1234567890
