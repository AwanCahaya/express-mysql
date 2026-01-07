const updateUserDB = (idUser, body) => {
  // 1. DEFINISI QUERY DINAMIS
  // Kita siapkan array penampung
  const queryParts = [];
  const values = [];

  // 2. FILTER & LOOPING (The "Magic" Part) 🎩
  // Kita cek satu-satu kunci yang dikirim body
  Object.keys(body).forEach((key) => {
    // VALIDASI KEAMANAN (Whitelisting) 🛡️
    // Pastikan user tidak bisa iseng update 'id', 'created_at', atau kolom rahasia lain.
    // Hanya kolom yang ada di daftar ini yang boleh diubah.
    const allowedColumns = ["name", "email", "address"];

    if (allowedColumns.includes(key)) {
      // Jika lolos validasi, masukkan ke antrian query
      queryParts.push(`${key} = ?`); // Hasil: ["name = ?", "email = ?"]
      values.push(body[key]); // Hasil: ["Budi", "budi@gmail.com"]
    }
  });

  // 3. CEK APAKAH ADA YANG DIUPDATE?
  if (queryParts.length === 0) {
    // Kalau body kosong atau tidak ada kolom yang valid, batalkan.
    return Promise.reject(new Error("Tidak ada data valid yang diupdate"));
  }

  // 4. RAKIT QUERY FINAL
  // Gabungkan array dengan koma
  const setClause = queryParts.join(", ");

  // Hasil SQL: "UPDATE users SET name = ?, email = ? WHERE id = ?"
  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

  // Jangan lupa masukkan ID user ke urutan terakhir array values
  values.push(idUser);

  // 5. EKSEKUSI
  return dbPool.execute(sql, values);
};
