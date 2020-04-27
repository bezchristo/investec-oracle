# Yo welcome to the Investec command center tutorial

<walkthrough-tutorial-duration duration=5></walkthrough-tutorial-duration>

## Setup Project

### Create Project
<walkthrough-project-billing-setup></walkthrough-project-billing-setup>

### Set project as default
``` bash
gcloud config set project investec-oracle
```

### Open shell for project
<walkthrough-open-cloud-shell-button></walkthrough-open-cloud-shell-button>

``` bash
gcloud services enable pubsub.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable firestore.googleapis.com
```


