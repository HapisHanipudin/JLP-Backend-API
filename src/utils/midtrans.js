import midtransClient from "midtrans-client";
export const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-I5EQSLwuG3BsEPgmdNkZExOY",
  clientKey: "SB-Mid-client-UM05dNq-Mq-rYQdQ",
});
