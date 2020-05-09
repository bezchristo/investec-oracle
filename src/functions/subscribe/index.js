"use strict";

const Firestore = require('@google-cloud/firestore');
const PROJECTID = process.env.GCLOUD_PROJECT;

const COLLECTION_NAME = 'transactions';
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.subscribe = (pubsubMessage) => {  
    console.log(pubsubMessage);
    // store/insert a new document
    const data = JSON.parse(Buffer.from(pubsubMessage.data, "base64").toString()) || {};    
    const created = new Date().getTime();
    return firestore.collection(COLLECTION_NAME)
      .add({ created, data })
      .then(doc => {
        console.log("success", doc);
      }).catch(err => {
        console.error(err);
        console.log(error, err);
      });
  
}