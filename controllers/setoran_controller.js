const Setoran = require("../models/setoran");
const mongoose = require("mongoose");

const loadSetoranById = async (req, res) => {
  const { id_santri } = req.query;

  try {
    const setoran = await Setoran.find({
      id_santri: new mongoose.Types.ObjectId(id_santri),
    }).sort({tanggal:-1});

    if (!setoran) {
      res.status(404).send("No Setoran Found");
    }

    res.status(200).json(setoran);
  } catch (e) {
    res.status(500).send("Error retrieving setoran from database" + e);
  }

  // db.query("select se.id_setoran,se.id_santri,s.nama,se.tanggal,se.jam,se.id_surah_mulai,se.ayat_mulai,se.id_surah_akhir,se.ayat_akhir from setoran_santri se inner join santri s on se.id_santri=s.id_santri where s.id_halaqoh=?")

  //   db.query(
  //     "select id_setoran,tanggal,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir from setoran_santri where id_santri=?",
  //     [id_santri],
  //     (err, result) => {
  //       if (err) {
  //         res
  //           .status(500)
  //           .send("Error retrieving setoran santri from database " + err);
  //       }

  //       res.json(result);
  //     }
  //   );
};

const addSetoran = async (req, res) => {
  const {
    id_santri,
    tanggal,
    jam,
    id_surah_mulai,
    ayat_mulai,
    id_surah_akhir,
    ayat_akhir,
  } = req.body;

  const [hari, bulan, tahun] = tanggal.split("-");
  const formattedDate = `${tahun}-${bulan}-${hari}`;

  try {
    Setoran.create({
      tanggal: formattedDate,
      jam: jam,
      id_surah_mulai: id_surah_mulai,
      ayat_mulai: ayat_mulai,
      id_surah_akhir: id_surah_akhir,
      ayat_akhir: ayat_akhir,
      id_santri: new mongoose.Types.ObjectId(id_santri),
    });

    res.sendStatus(201);
  } catch (e) {
    res.status(500).send("Error inserting setoran into database" + e);
  }
};

const updateSetoran= async(req,res)=>{
  const {id_setoran,tanggal,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir}=req.body

  const [hari, bulan, tahun]=tanggal.split("-")
  const formattedDate=`${tahun}-${bulan}-${hari}`

  try{
    const existingSetoran=await Setoran.findById(id_setoran)
  
    existingSetoran.tanggal=formattedDate
    existingSetoran.jam=jam
    existingSetoran.id_surah_mulai=id_surah_mulai
    existingSetoran.ayat_mulai=ayat_mulai
    existingSetoran.id_surah_akhir=id_surah_akhir
    existingSetoran.ayat_akhir=ayat_akhir
  
    await existingSetoran.save()
  
    res.sendStatus(200)
  }catch(e){
    res.status(500).json({message:`Error dalam mengupdate data setoran id: ${id_setoran}: ${e}`})
  }
}

const deleteSetoran=async (req,res)=>{
  const {id_setoran}=req.query

  try{
    await Setoran.findByIdAndDelete(id_setoran)

    res.sendStatus(200)
  }catch(e){
    res.status(500).json({messsage:`Error menghapus setoran dari database: ${e}`})
  }
}
module.exports = { loadSetoranById, addSetoran ,updateSetoran,deleteSetoran};
