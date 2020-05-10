# Yo welcome to the Investec command center tutorial

<walkthrough-author name="Christo Bezuidenhout" repositoryUrl="https://gitlab.com/bezchristo/investec-command-center" tutorialName="investec_command_center"></walkthrough-author>
<walkthrough-tutorial-duration duration=5></walkthrough-tutorial-duration>

## Introduction

This tutorial will guide you through setting up your investec command center using terraform and the google cloud platform.
As part of this tutorial you will have to create a gcp project which has billing enabled. Rest assured though, you should fall well underneath the free tier, so no monthly bill.

When you are ready click start to continue.

## Step 1

### Create Project

<walkthrough-project-billing-setup></walkthrough-project-billing-setup>

### Set project as default

``` bash
gcloud config set project {{project-id}}
```

### Enable Api's

``` bash
gcloud services enable pubsub.googleapis.com
```

``` bash
gcloud services enable cloudfunctions.googleapis.com
```

``` bash
gcloud services enable firestore.googleapis.com
```

## Step 2

### Generate Key for Service Account

We need to generate a key to use during authentication when making calls to our cloud functions. The script below will create a key which you need to keep safe.

``` bash
gcloud iam service-accounts keys create ~/key.json --iam-account {{project-id}}@appspot.gserviceaccount.com
```
<walkthrough-editor-open-file filePath="key.json">
    Open key.json
</walkthrough-editor-open-file>

Copy the private key and paste it into the *key* viarable of your investec .env file.

## Step 3

### Initialize Terraform

``` bash
terraform init
```

### Apply the Terraform script

You can change the topic variable if you want a different topic name.

``` bash
terraform apply -var topic="transactions" -var project="{{project-id}}"
```