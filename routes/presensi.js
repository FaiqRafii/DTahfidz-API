const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.route("/santri").get((req, res) => {
  const { id_halaqoh, tanggal, jam } = req.query;

  if (!id_halaqoh || !tanggal || !jam) {
    return res
      .status(400)
      .send("Missing required parameters: id_halaqoh, tanggal, or jam");
  }

  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  db.query(
    "select p.id_presensi,p.id_santri,p.status from presensi_santri p inner join santri s on p.id_santri=s.id_santri inner join halaqoh h on s.id_halaqoh=h.id_halaqoh where h.id_halaqoh=? and p.tanggal=? and p.jam=?",
    [id_halaqoh, formattedDate, jam],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send("Error retrieving presensi santri from database " + err);
      }

      res.json(result);
    }
  );
}).post((req,res)=>{
  const {id_santri,tanggal,jam,status}=req.body

  const [hari,bulan,tahun]=tanggal.split("-")
  const formattedDate=`${tahun}-${bulan}-${hari}`
  
  db.query("insert into presensi_santri(id_santri,tanggal,jam,status) values (?,?,?,?)",[id_santri,formattedDate,jam,status],(err,result)=>{
    if(err){
      res.status(500).send("Error inserting presensi santri into database " + err);
    }

    res.sendStatus(201)
  })
})

router.route("/musyrif").get((req, res) => {
  const { id_user, tanggal } = req.query;
  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  db.query(
    "select jam from presensi_musyrif where id_user=? and tanggal=?",
    [id_user, formattedDate],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send("Error retrieving presensi santri from database " + err);
      }

      res.json(result);
    }
  );
}).post((req,res)=>{
  const {id_user,tanggal,jam}=req.body

  const [hari,bulan,tahun]=tanggal.split("-")
  const formattedDate=`${tahun}-${bulan}-${hari}`

  db.query("insert into presensi_musyrif(id_user,tanggal,jam) values(?,?,?)",[id_user,formattedDate,jam],(err,result)=>{
    if(err){
      res.status(500).send("Error inserting presensi musyrif into database " + err);
    }

    res.sendStatus(201)
  })
})

module.exports = router;
