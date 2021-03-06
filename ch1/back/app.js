const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

db.sequelize.sync();

app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("안녕 제로초");
});

app.post("/user", async (req, res, next) => {
  try {
    const newUser = await db.User.create({
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
