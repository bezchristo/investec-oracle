"use strict";

const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub();

/**
 * Publishes a message to a Cloud Pub/Sub Topic. *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {object} res Cloud Function response context.
 */

exports.publish = async (req, res) => {  

  console.log(`Publishing message`);

  // References an existing topic
  const topic = pubsub.topic(process.env.TOPIC);
  const messageBuffer = Buffer.from(JSON.stringify(req.body), "utf8");

  // Publishes a message
  try {
    await topic.publish(messageBuffer);
    res.status(200).send("Message published");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
};
