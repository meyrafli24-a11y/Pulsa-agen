
import crypto from "crypto";

let cachedProducts = null;
let cacheTime = 0;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  const username = process.env.DIGIFLAZZ_USERNAME;
  const apiKey = process.env.DIGIFLAZZ_API_KEY;

  if (!username || !apiKey) {
    return res.status(500).json({
      success: false,
      message: "Konfigurasi API belum lengkap"
    });
  }

  // Cache 5 menit agar tidak terlalu sering
  // meminta daftar harga ke Digiflazz.
  if (cachedProducts && Date.now() - cacheTime < 300000) {
    return res.status(200).json({
      success: true,
      toko: "PULSAKULA",
      mode: "API",
      products: cachedProducts
    });
  }

  try {
    const sign = crypto
      .createHash("md5")
      .update(username + apiKey + "pricelist")
      .digest("hex");

    const response = await fetch(
      "https://api.digiflazz.com/v1/price-list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cmd: "prepaid",
          username,
          sign
        })
      }
    );

    if (!response.ok) {
      throw new Error("Digiflazz HTTP " + response.status);
    }

    const result = await response.json();

    if (!Array.isArray(result.data)) {
      throw new Error(
        result.message || "Data produk tidak ditemukan"
      );
    }

    const allowedBrands = [
      "TELKOMSEL",
      "INDOSAT",
      "XL",
      "AXIS",
      "TRI",
      "THREE",
      "SMARTFREN"
    ];

    const products = result.data
      .filter(item => {
        const brand = String(item.brand || "")
          .toUpperCase()
          .trim();

        return (
          String(item.category).toLowerCase() === "pulsa" &&
          allowedBrands.includes(brand) &&
          item.buyer_product_status === true &&
          item.seller_product_status === true
        );
      })
      .map(item => ({
        id: item.buyer_sku_code,
        name: item.product_name,
        category: "Pulsa",
        brand: item.brand,
        price: Number(item.price),
        status: "tersedia"
      }))
      .filter(item =>
        item.id &&
        item.name &&
        Number.isFinite(item.price)
      )
      .sort((a, b) => a.price - b.price);

    cachedProducts = products;
    cacheTime = Date.now();

    return res.status(200).json({
      success: true,
      toko: "PULSAKULA",
      mode: "API",
      total: products.length,
      products
    });

  } catch (error) {
    console.error("Digiflazz error:", error);

    return res.status(502).json({
      success: false,
      message: "Gagal mengambil produk dari provider"
    });
  }
}
