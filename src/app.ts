import express from "express";
import { Bedrock } from "./modules/bedrock/bedrock";

const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  Bedrock.contentFor("Which features do you have?").then((response: any) => {
    return res.send(response);
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
