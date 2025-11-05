const express=require('express')
const router=express.Router()
const db=require('../config/db')

router.get('/',(req,res)=>{
    const id_halaqoh=req.query.id_halaqoh

    db.query('SELECT id_halaqoh,id_user,halaqoh,jumlah_santri,lokasi_halaqoh FROM halaqoh WHERE id_halaqoh=?',[id_halaqoh],(err,result)=>{
        if(err){
            res.status(500).send("Error retrieving halaqoh from database")
        }

        res.json(result)
    })
})

module.exports=router