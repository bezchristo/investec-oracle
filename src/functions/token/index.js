"use strict";

const { google } = require("googleapis");

exports.getGoogleToken = async (req, res) => {
  if (!req.body.email || !req.body.key || !req.body.endpoint) {
    res
      .status(500)
      .send(
        'Missing parameter(s); include "email", "key" and "endpoint" properties in your request.'
      );
    return;
  }

  const client = new google.auth.JWT({
    email: req.body.email,
    key: req.body.key,
  });
  let token = await client
    .fetchIdToken(req.body.endpoint)
    .then((idToken) => {
      return idToken;
    })
    .catch((error) => {      
      console.log(error.message);
      res.status(500).send(error.message);
    });

  return res.status(200).send(token);
};
