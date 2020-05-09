resource "google_pubsub_topic" "master" {
  name = var.topic
}

resource "google_storage_bucket" "bucket" {
  name = "century_source_code"
}

resource "google_storage_bucket_object" "publish_code" {
  name   = "publish.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./src/functions/publish/publish.zip"
}

resource "google_storage_bucket_object" "subscribe_code" {
  name   = "subscribe.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./src/functions/subscribe/subscribe.zip"
}

resource "google_storage_bucket_object" "token_code" {
  name   = "token.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./src/functions/token/token.zip"
}

resource "google_cloudfunctions_function" "subscribe_function" {
  name        = "subscribe"
  description = "Transaction subscription function"
  runtime     = "nodejs10"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.subscribe_code.name
  timeout               = 60
  entry_point           = "subscribe"

  project               = var.project
  region                = "us-central1"

  event_trigger {
    event_type = "google.pubsub.topic.publish"
    resource   = google_pubsub_topic.master.name
    failure_policy {
      retry = true
    }
  }
}

resource "google_cloudfunctions_function" "publish_function" {
  name        = "publish"
  description = "Transaction publish function"
  runtime     = "nodejs10"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.publish_code.name
  timeout               = 60
  entry_point           = "publish"
  trigger_http          = true
  project               = var.project
  region                = "us-central1"

  environment_variables = {
    TOPIC = google_pubsub_topic.master.name
  }
}

resource "google_cloudfunctions_function" "token_function" {
  name        = "getGoogleToken"
  description = "Retrieves token"
  runtime     = "nodejs10"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.token_code.name
  timeout               = 60
  entry_point           = "getGoogleToken"
  trigger_http          = true
  project               = var.project
  region                = "us-central1"
}

# IAM entry for a single user to invoke the function
resource "google_cloudfunctions_function_iam_member" "publish_invoker" {
  project        = google_cloudfunctions_function.publish_function.project
  region         = google_cloudfunctions_function.publish_function.region
  cloud_function = google_cloudfunctions_function.publish_function.name

  role   = "roles/cloudfunctions.invoker"
  member = "serviceAccount:${var.project}@appspot.gserviceaccount.com"
}

# IAM entry for a single user to invoke the function
resource "google_cloudfunctions_function_iam_member" "token_invoker" {
  project        = google_cloudfunctions_function.token_function.project
  region         = google_cloudfunctions_function.token_function.region
  cloud_function = google_cloudfunctions_function.token_function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}


