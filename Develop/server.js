var express = require("express");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT,() => console.log(`listening on PORT: ${PORT}`));