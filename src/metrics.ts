import express from "express";

import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "Rest Response Time duration in seconds",
  labelNames: ["method", "route", "status_code"],
});

const startMetricsServer = () => {
  app.get("/metrics", async (_, res) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });
  app.listen(9100);
};

export default startMetricsServer;
