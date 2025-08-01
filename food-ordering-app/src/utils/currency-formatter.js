export const formatToNaira = (amount) => {
  // Check if the input is a valid number
  if (typeof amount !== 'number' || isNaN(amount)) {
    console.error("Invalid input: Please provide a valid number for currency formatting.");
    return "";
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(amount);
}