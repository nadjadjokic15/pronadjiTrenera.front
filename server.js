const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.DATABASE_URL);
const db = mysql.createConnection(process.env.DATABASE_URL);


const app = express();

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected");
});

//Api za dobijane trenera
app.get("/treiners",(req,res)=>{
    db.query("SELECT * FROM treiners",(err, results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.json(results)
        }
    })
})

//Api za dodavanje trenera
app.post("/treiners",(req,res)=>{
    const{ name,surname, img_url, description}=req.body;
    db.query(
        "INSERT INTO treiners (name, surname, image_url, description) VALUES (?, ?, ?, ?)",
        [name, surname, image_url, description],
        (err,result)=>{
            if(err){
                res.status(500).send(err)
            }else {
                res.json({id:result.insertId, name, surname, image_url, description});
            }
        }
    )
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server running on port 5000")
})