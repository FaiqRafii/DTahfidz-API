const express=require('express')
const router=express.Router()
const db=require('../config/db')

router.route("/").get((req,res)=>{
    const {id_santri}=req.query

    // db.query("select se.id_setoran,se.id_santri,s.nama,se.tanggal,se.jam,se.id_surah_mulai,se.ayat_mulai,se.id_surah_akhir,se.ayat_akhir from setoran_santri se inner join santri s on se.id_santri=s.id_santri where s.id_halaqoh=?")

    db.query("select id_setoran,tanggal,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir from setoran_santri where id_santri=?",[id_santri],(err,result)=>{
        if(err){
            res.status(500).send("Error retrieving setoran santri from database " + err);
        }

        res.json(result)
    })
}).post((req,res)=>{
    const {id_santri,tanggal,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir}=req.body

    const [hari,bulan,tahun]=tanggal.split("-")
    const formattedDate=`${tahun}-${bulan}-${hari}`

    db.query("insert into setoran_santri(id_santri,tanggal,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir) values(?,?,?,?,?,?,?)",[id_santri,formattedDate,jam,id_surah_mulai,ayat_mulai,id_surah_akhir,ayat_akhir],(err,result)=>{
        if(err){
            res.status(500).send("Error inserting setoran santri into database " + err);
        }

        res.sendStatus(201)
    })
})

module.exports=router