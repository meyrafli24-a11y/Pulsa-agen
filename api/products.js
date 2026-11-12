
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan"
    });
  }

  const products = [
    {
      id: "PULSA10",
      name: "Pulsa Telkomsel 10.000",
      category: "Pulsa",
      price: 12000,
      status: "tersedia"
    },
    {
      id: "PULSA20",
      name: "Pulsa Indosat 10.000",
      category: "Pulsa",
      price: 12000,
      status: "tersedia"
    },
    {
      id: "DATA5GB",
      name: "Paket Data 5GB",
      category: "Paket Data",
      price: 18000,
      status: "tersedia"
    },
    {
      id: "PLN20",
      name: "Token PLN 20.000",
      category: "Token Listrik",
      price: 22000,
      status: "tersedia"
    },
    {
      id: "GAME15",
      name: "Top Up Game 15.000",
      category: "Top Up Game",
      price: 17000,
      status: "tersedia"
    }
  ];

  return res.status(200).json({
    success: true,
    toko: "PULSAKULA",
    mode: "SIMULASI",
    products
  });
}
