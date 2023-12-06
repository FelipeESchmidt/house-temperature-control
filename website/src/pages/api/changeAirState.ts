import { NextApiRequest, NextApiResponse } from "next";

const mqtt = require("mqtt");

const protocol = "mqtt";
const host = "test.mosquitto.org";
const port = "1883";
const clientId = `nodeGURIpublish`;

const connectUrl = `${protocol}://${host}:${port}`;

const mqttClient = mqtt.connect(connectUrl);

const validateErrors = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid Method!" });
    return true;
  }

  const { on } = req.body;

  if (on === undefined || on === null) {
    res.status(400).json({ error: "Invalid!" });
    return true;
  }

  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let client;
  try {
    if (validateErrors(req, res)) {
      return res.end();
    }

    client = mqtt.connect(connectUrl);

    const { on } = req.body;

    mqttClient.publish("AresGURImc", `${on}`);

    res.status(200).json({ air: on });
    res.end();
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  } finally {
    if (client) client.end(true);
    res.end();
  }
};

export default handler;
