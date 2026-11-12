
import { readJson } from "./_lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  try {
    const products = await readJson("products.json", []);

    return res.status(200).json({
      success: true,
      toko: "PULSAKULA",
      mode: "KATALOG",
      total: products.length,
      products
    });
  } catch (error) {
    console.error("Kesalahan katalog:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal membaca katalog produk"
    });
  }
}
