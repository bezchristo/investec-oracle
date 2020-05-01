"use strict";

//exports.subscribe = (pubsubMessage) => {
  // Print out the data from Pub/Sub, to prove that it worked
  //console.log(Buffer.from(pubsubMessage.data, "base64").toString());
//};

const Firestore = require('@google-cloud/firestore');
const PROJECTID = process.env.GCLOUD_PROJECT;

console.log("Project",PROJECTID);

const COLLECTION_NAME = 'transactions';
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.subscribe = (pubsubMessage) => {  

  console.log("message", pubsubMessage);

  if (req.method === 'POST') {
    // store/insert a new document
    const data = (req.body) || {};
    const ttl = Number.parseInt(data.ttl);
    const ciphertext = (data.ciphertext || '').replace(/[^a-zA-Z0-9\-]*/g, '');
    const created = new Date().getTime();
    return firestore.collection(COLLECTION_NAME)
      .add({ created, ttl, ciphertext })
      .then(doc => {
        console.log("success", doc);
      }).catch(err => {
        console.error(err);
        console.log(error, err);
      });
  }  
}