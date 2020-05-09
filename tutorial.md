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

``` bash
gcloud services enable pubsub.googleapis.com
````
```` bash
gcloud services enable cloudfunctions.googleapis.com
````
``` bash
gcloud services enable firestore.googleapis.com
````

### Apply terraform file and variables

``` bash
terraform init
```

``` bash
terraform apply -var topic="transactions" -var project="{{project-id}}"
```