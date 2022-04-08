const express = require("express");
const fs = require("fs");

if (!fs.existsSync("./hits.txt")) {
  fs.writeFileSync("./hits.txt", "0");
}
let hits = Number(fs.readFileSync("./hits.txt").toString());

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/api/hits", (req, res) => {
  hits++;
  res.status(200).send(hits.toString());
});
app.listen(2048);

setInterval(() => {
  fs.writeFile("./hits.txt", hits.toString(), () =>
    console.log(`Saved count of ${hits}`)
  );
}, 60000);
