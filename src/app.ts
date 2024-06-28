import express from "express";

import axios from "axios";

const app = express();

const endpoint = "https://jsonplaceholder.typicode.com";

app.get("/", (_, res) => {
  res.json({ message: "It works" });
});

app.get("/posts", async (_, res) => {
  const { data } = await axios.get(`${endpoint}/users`);
  return res.json(data);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`${endpoint}/users/${id}`);
  return res.json(data);
});

app.listen(6000);
