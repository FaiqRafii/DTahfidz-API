const mongoose = require("mongoose");
const PresensiSantri = require("../models/presensi_santri");
const PresensiMusyrif = require("../models/presensi_musyrif");

const addPresensiSantri = async (req, res) => {
  const presensiData = req.body;

  try {
    const presensiPromises = presensiData.map(async (item) => {
      const [hari, bulan, tahun] = item.tanggal.split("-");
      const formattedDate = `${tahun}-${bulan}-${hari}`;

      const existingPresensi = await PresensiSantri.findOne({
        id_santri: new mongoose.Types.ObjectId(item.id_santri),
        tanggal: formattedDate,
        jam: item.jam,
      });

      if (existingPresensi) {
        existingPresensi.status = item.status;
        await existingPresensi.save();
      } else {
        const newPresensi = new PresensiSantri({
          tanggal: formattedDate,
          jam: item.jam,
          status: item.status,
          id_santri: new mongoose.Types.ObjectId(item.id_santri),
        });

        await newPresensi.save();
      }
    });
    await Promise.all(presensiPromises);
    res.sendStatus(201);
  } catch (e) {
    res.status(500).send(`Error processing presensi santri: ${e}`);
  }

  // const { id_santri, tanggal, jam, status } = req.body;

  // try {
  //   PresensiSantri.create({
  //     tanggal: formattedDate,
  //     jam: jam,
  //     status: status,
  //     id_santri: new mongoose.Types.ObjectId(id_santri),
  //   });

  //   res.sendStatus(201);
  // } catch (e) {
  //   res.status(500).send(`Error inserting presensi santri into database: ${e}`);
  // }
};

const addPresensiMusyrif = async (req, res) => {
  const { id_user, tanggal, jam } = req.body;

  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  try {
    PresensiMusyrif.create({
      tanggal: formattedDate,
      jam: jam,
      id_user: new mongoose.Types.ObjectId(id_user),
    });

    res.sendStatus(201);
  } catch (e) {
    res
      .status(500)
      .send(`Error inserting presensi musyrif into database: ${e}`);
  }
};

const loadPresensiSantri = async (req, res) => {
  const { id_halaqoh, tanggal, jam } = req.query;

  if (!id_halaqoh || !tanggal || !jam) {
    return res
      .status(400)
      .send("Missing required parameters: id_halaqoh, tanggal, or jam");
  }

  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  try {
    const presensi = await PresensiSantri.find({
      tanggal: formattedDate,
      jam: jam,
    }).populate({
      path: "id_santri",
      match: { id_halaqoh: new mongoose.Types.ObjectId(id_halaqoh) },
      select: "_id nama kelas",
    });

    const result = presensi.filter((item) => item.id_santri !== null);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).send("Presensi Santri Not Found");
  }

  // db.query(
  //   "select p.id_presensi,p.id_santri,p.status from presensi_santri p inner join santri s on p.id_santri=s.id_santri inner join halaqoh h on s.id_halaqoh=h.id_halaqoh where h.id_halaqoh=? and p.tanggal=? and p.jam=?",
  //   [id_halaqoh, formattedDate, jam],
  //   (err, result) => {
  //     if (err) {
  //       res
  //         .status(500)
  //         .send("Error retrieving presensi santri from database " + err);
  //     }

  //     res.json(result);
  //   }
  // );
};

const loadPresensiMusyrif = async (req, res) => {
  const { id_user, tanggal } = req.query;
  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  try {
    const presensi = await PresensiMusyrif.find({
      id_user: new mongoose.Types.ObjectId(id_user),
      tanggal: formattedDate,
    });

    res.status(200).json(presensi);
  } catch (e) {
    res
      .status(500)
      .send(`Error retrieving presensi musyrif from database ${e}`);
  }

  //   db.query(
  //     "select jam from presensi_musyrif where id_user=? and tanggal=?",
  //     [id_user, formattedDate],
  //     (err, result) => {
  //       if (err) {
  //         res
  //           .status(500)
  //           .send("Error retrieving presensi santri from database " + err);
  //       }

  //       res.json(result);
  //     }
  //   );
};

module.exports = {
  addPresensiSantri,
  addPresensiMusyrif,
  loadPresensiSantri,
  loadPresensiMusyrif,
};
