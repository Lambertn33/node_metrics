import express, { Response, Request } from "express";

import axios from "axios";

import responseTime from "response-time";

import startMetricsServer, { apiHistogram } from "./metrics";

const app = express();

const endpoint = "https://jsonplaceholder.typicode.com";

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      apiHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          statusCode: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

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

startMetricsServer();
