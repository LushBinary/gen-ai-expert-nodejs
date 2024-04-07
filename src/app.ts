import express from "express";

const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  return res.send("Success");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
