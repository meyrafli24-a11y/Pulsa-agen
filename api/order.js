
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Gunakan metode POST"
    });
  }

  const { product, customer } = req.body || {};

  if (!product || !customer) {
    return res.status(400).json({
      success: false,
      message: "Data produk dan pelanggan wajib diisi"
    });
  }

  return res.status(200).json({
    success: true,
    mode: "SIMULASI",
    order_id: "PKL-" + Date.now(),
    product,
    customer,
    status: "MENUNGGU PEMBAYARAN",
    message: "Pesanan simulasi berhasil dibuat"
  });
}
