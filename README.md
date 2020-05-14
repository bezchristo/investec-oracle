# Investec Command Center (Unstable)

The following tutotial will set up a command center which can process investec transactions via GCP services.

![alt text](Investec.jpg "Command Center)

It makes use of the following services:
* Cloud Functions
* Pub Sub
* Firestore
* Buckets

To setup your command center follow the tutorial on google cloud shell. 

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Fbezchristo%2Finvestec-oracle.git&cloudshell_print=cloud-shell-readme.txt&cloudshell_open_in_editor=main.tf&cloudshell_tutorial=tutorial.md&hl=en_GB&fromcloudshell=true&shellonly=false#id=I0_1588005425124&_gfid=I0_1588005425124&parent=https:%2F%2Fconsole.cloud.google.com)

Copy the following into your env.json file in the investec IDE. 

``` js
{
    "authUrl": "https://us-central1-<project-id>.cloudfunctions.net/getGoogleToken",
    "key": "<your generated key>",
    "transactionUrl": "https://us-central1-<project-id>.cloudfunctions.net/publish",
    "email": "<project-id>@appspot.gserviceaccount.com"
}
```

Replace "project-id" and "your generated key" with the project id and key you generated during the GCP tutorial.

Copy the following code into your main.js.

``` js
// This function runs before a transaction.
const beforeTransaction = async (authorization) => {
    console.log(authorization);
    return true;
};

// Retrieve token 
async function getToken() {
    try {
        let response = await fetch(process.env.authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email: process.env.email, key: process.env.key})
        });

        return response.text();
    } catch(error) {
        console.log(error);
    }
};

// Post transaction
async function postTransaction(transaction, token) {
    try {
        let response = await fetch(process.env.transactionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(transaction)
        });

        const result = await response.text();
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}

// This function runs after a transaction was successful.
const afterTransaction = async (transaction) => {    
    let token = await getToken();

    if (token) 
    {
        await postTransaction(transaction, token);
    }
};
// This function runs after a transaction has been declined.
// const afterDecline = async (transaction) => { };
// This function runs after a transaction has been reversed.
// const afterReversal = async (transaction) => { };
// This function runs after a transaction has been adjusted.
// const afterAdjustment = async (transaction) => { };

```

Deploy your code and simulate a transaction to make sure that everything works. If the transaction posts successfully you should get a response saying "message published". You can check your firebase database to view the data. 

## Issues
If you run into any issues on the tutorial please raise an issue on gitlab or chat to me via slack.

## Whats next
* Setup Elastic + Kibana or Grafana
* Setup React UI hooked up to Firestore database
