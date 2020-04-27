# Yo welcome to the Investec command center tutorial

<walkthrough-tutorial-duration duration=5></walkthrough-tutorial-duration>

## Setup Project

### Create Project
<walkthrough-project-billing-setup></walkthrough-project-billing-setup>

### Set project as default
``` bash
gcloud config set project {{project-id}}
```

### Enable Api's
<walkthrough-enable-apis apis="pubsub.googleapis.com,cloudfunctions.googleapis.com,firestore.googleapis.com"></walkthrough-enable-apis>

or

``` bash
gcloud services enable pubsub.googleapis.com
````
```` bash
gcloud services enable cloudfunctions.googleapis.com
````
``` bash
gcloud services enable firestore.googleapis.com
````


