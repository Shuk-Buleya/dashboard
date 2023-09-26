const { application } = require("express")
const express = require("express")
const fruitData = require("./public/data")
const index = express()
const port = 4000

index.set("view engine", "ejs")
index.use(express.static("public"))


index.get("/",(req,res)=>{
    res.render('index')
})
index.get("/barchart",(req,res)=>{
    const data = { data: fruitData};
    res.render('barchart', data)
})

index.get("/piechart",(req,res)=>{
    const data = { data: fruitData};
    res.render("piechart",data);
})

index.get("/linechart",(req,res)=>{
    const data = { data: fruitData};
    res.render("linechart",data);
})
 
index.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})