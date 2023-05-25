import srvBrg from "../../models/ServicesBrg.js";

export const addSrv = async (req, res) => {
  // mendapatkan data input dari form
  const {
    kd_brg_srv,
    nm_brg_srv,
    spek_brg_srv,
    srv_list,
    lokasi_srv,
    tgl_mulai,
    harga_srv,
    status_srv,
    tgl_selesai,
  } = req.body;

  // mendapatkan semua kode barang
  const getSrvAll = await srvBrg.findAll();
  for (let i = 0; i < getSrvAll.length; i++) {
    // console.log(getSrvAll[i].kd_brg);
    let new_kd_brg_srv = getSrvAll[i].kd_brg_srv;
    // jika kd_brg_srv sama
    if (new_kd_brg_srv === kd_brg_srv)
      return res.status(500).json({ msg: "Barang sudah di proses service" });
  }
  // proses create barang
  try {
    await srvBrg.create({
      kd_brg_srv: kd_brg_srv,
      nm_brg_srv: nm_brg_srv,
      spek_brg_srv: spek_brg_srv,
      srv_list: srv_list,
      lokasi_srv: lokasi_srv,
      tgl_mulai: tgl_mulai,
      harga_srv: harga_srv,
      status_srv: status_srv,
      tgl_selesai: tgl_selesai,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Data Service Berhasil di Simpan." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
