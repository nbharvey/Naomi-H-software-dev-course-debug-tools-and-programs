const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be < FIXED
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  // return total - total * discountRate; // FIXED Bug: Missing validation for discountRate
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
    console.error("Invalid. Enter a number between 0 and 1.")
    return total;
  }
  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
// reciept += `${item.name}: $${item.price}\n`; Bug: total may not be a number FIXED
  if (typeof total !== "number" || isNaN(total)) {
    console.error("Invalid.");
    receipt += "Total: Error calculation total.";
  } else {
    receipt += `Total: $${total.toFixed(2)}`;
  }
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;


// Summary:
// I found an off-by-one error in the calculateTotal loop and fixed it by changing the condition from i <= cartItems.length to i < cartItems.length.
// I added validation in applyDiscount to handle invalid discountRate values and updated generateReceipt to prevent NaN from appearing in the output.
// Using the Console tab and breakpoints in the Sources tab helped me trace variable values and pause execution to understand the call stack and logic errors.
// I validated the fixes with an empty cart, a single-item cart, and discount rates of 0 and 1, confirming the program works correctly in all cases.