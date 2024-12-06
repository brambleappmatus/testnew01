export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};

export const generateId = (): string => {
  return Date.now().toString();
};