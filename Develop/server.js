var express = require("express");
var path = require("path")
var fs = require("fs");


const userNotes = [
    {
        title: "aida",
        notes: "hello"

}]



var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// what client can see on the browser
app.use(express.static("public"));

app.get("/", function(req, res) {
    // concatanating where my file is
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    // concatanating where my file is
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes",function(req,res) {
    res.json("userNotes");
})








app.post("/api/notes", function(req,res){
    let newNote = req.body;
    let saved = JSON.parse(fs.readFile("./db/db.json", "utf8"));
    saved.push(newNote);
    // console.log(req.body);
    // res.json("added")
})





app.listen(PORT,() => console.log(`listening on PORT: ${PORT}`));