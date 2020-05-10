"use strict";

const { google } = require("googleapis");

exports.getGoogleToken = async (req, res) => {
  if (!req.body.email || !req.body.key) {
    res
      .status(500)
      .send(
        'Missing parameter(s); include "email" and "key" properties in your request.'
      );
    return;
  }

  const client = new google.auth.JWT({
    email: req.body.email,
    key: req.body.key,
  });
  let token = await client
    .fetchIdToken(process.env.transactionUrl)
    .then((idToken) => {
      return idToken;
    })
    .catch((error) => {      
      console.log(error.message);
      res.status(500).send(error.message);
    });

  return res.status(200).send(token);
};
