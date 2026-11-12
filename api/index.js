
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  res.status(200).json({
    success: true,
    toko: "PULSAKULA",
    status: "Backend aktif",
    mode: "SIMULASI",
    message: "API berhasil dijalankan"
  });
}
