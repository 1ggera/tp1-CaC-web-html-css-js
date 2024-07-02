const express = require("express")
const router = express.Router();
const db = require("../db/db")


router.get("/",(req,res)=>{
    const sql = "SELECT * FROM categorias";
    db.query(sql, (err,results)=>{
        if(err) return res.status(500).send(err)
        return res.status(200).send(results)
    })
})

module.exports = router