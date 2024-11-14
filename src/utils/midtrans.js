import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-Y1sjkAeW-fxXhzgJqg7jswRD",
  clientKey: "SB-Mid-client-9gOtmgGB6g_eNC3_",
});
