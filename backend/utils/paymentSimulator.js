// utils/paymentSimulator.js
module.exports = function (paymentMethod, amount) {
  console.log(`Simulating payment of ${amount} using ${paymentMethod}`);
  return { success: true, transactionId: Date.now() };
};
