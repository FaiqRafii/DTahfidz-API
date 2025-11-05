const express=require('express')
const router=express.Router()
const db=require('../config/db')

router.get('/',(req,res)=>{
    const {id_halaqoh}=req.query

    db.query("select id_santri,nama,kelas from santri where id_halaqoh=?",[id_halaqoh],(err,result)=>{
        if(err){
            res.status(500).send("Error retrieving santri from database " + err);
        }

        res.json(result)
    })
})

module.exports=router