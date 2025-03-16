const crypto = require('crypto');

// Function to generate HMAC hash
function generateHMAC(data, secretKey) {
  return crypto.createHmac('sha256', secretKey)
               .update(data)
               .digest('hex');
}

// Sample data (this will be the QR code data)
const paymentData = {
    upi: "your-upi-id@upi", 
    amount: "100", 
    note: "Payment for XYZ"
};

// Secret key for HMAC (should be kept safe and not hardcoded)
const secretKey = "your-secret-key";

// Create a string of payment data (this will be embedded in the QR code)
const dataString = `upi://pay?pa=${paymentData.upi}&am=${paymentData.amount}&tn=${encodeURIComponent(paymentData.note)}&cu=INR`;

// Generate HMAC hash
const hash = generateHMAC(dataString, secretKey);

console.log("HMAC Hash: ", hash);
