function calculateDiscountedPrice(quantity, price, discountRules) {
  let total = quantity * price;

  for (const rule of discountRules) {
    if (rule.ruleType === "flat_10_discount" && total > 200) {
      total -= 10;
    } else if (rule.ruleType === "bulk_5_discount" && quantity > 10) {
      total -= (price * quantity * 0.05);
    } else if (rule.ruleType === "bulk_10_discount" && quantity > 20) {
      total -= (total * 0.1);
    } else if (
      rule.ruleType === "tiered_50_discount" &&
      quantity > 30 &&
      quantityPerProduct > 15
    ) {
      total -= (price * (quantityPerProduct - 15) * 0.5);
    }
  }

  return total;
}
//Shipping Function
function calculateShippingFee(quantity) {
  const packageCount = Math.ceil(quantity / 10);
  return packageCount * 5;
}

// Total Function
function calculateTotal(quantity, price, discountRules, isGiftWrapped) {
  const subtotal = quantity * price;
  const discountAmount = calculateDiscountedPrice(quantity, price, discountRules) - subtotal;
  const shippingFee = calculateShippingFee(quantity);
  const giftWrapFee = isGiftWrapped ? quantity : 0;
  const total = subtotal + shippingFee + giftWrapFee - discountAmount;

  return {
    subtotal,
    discountName: discountAmount > 0 ? discountRules[0].ruleType : "No discount applied",
    discountAmount,
    shippingFee,
    giftWrapFee,
    total,
  };
}

function getProductDetails(productName) {
// Replace this with your own logic to retrieve product details based on the product name
  const products = {
    "Product A": { price: 20 },
    "Product B": { price: 40 },
    "Product C": { price: 50 },
  };

  return products[productName];
}

// Example usage
const discountRules = [
  { ruleType: "flat_10_discount" },
  { ruleType: "bulk_5_discount" },
  { ruleType: "bulk_10_discount" },
  { ruleType: "tiered_50_discount" },
];

const productName = "Product A";
const productDetails = getProductDetails(productName);

const quantity = 12; // Example quantity for testing
const isGiftWrapped = true; // Example value for testing

const result = calculateTotal(quantity, productDetails.price, discountRules, isGiftWrapped);

// Final Output
console.log("Product:", productName);
console.log("Quantity:", quantity);
console.log("Total Amount:", quantity * productDetails.price);
console.log("Subtotal:", result.subtotal);
console.log("Discount Applied:", result.discountName);
console.log("Discount Amount:", result.discountAmount);
console.log("Shipping Fee:", result.shippingFee);
console.log("Gift Wrap Fee:", result.giftWrapFee);
console.log("Total:", result.total);
