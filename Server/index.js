const express = require("express");

const server = express();

server.use(express.json());

const users = ["Bruno", "Robson", "Ismael"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metódo: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, news) {
  if (!req.body.use) {
    return res
      .status(400)
      .json({ erro: "Usuário não encontrado no corpo da requisião" });
  }
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.slice(index, 1);

  return res.send();
});

server.listen(3000);
