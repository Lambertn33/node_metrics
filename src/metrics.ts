import express from "express";

import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

export const apiHistogram = new client.Histogram({
  help: "rest API time count",
  name: "rest_api_time_count",
  labelNames: ["method", "route", "statusCode"],
});

const app = express();

const startMetricsServer = () => {
  app.get("/metrics", async (_, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });
  app.listen(9100);
};

export default startMetricsServer;
