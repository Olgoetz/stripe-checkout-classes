
resource "vercel_project" "this" {
  name      = "stripe-checkout-classes"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = github_repository.this.full_name
  }
}


resource "vercel_project_environment_variable" "stripe_secret" {
  project_id = vercel_project.this.id
  key        = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  value      = var.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  target     = ["production", "development"]
}
resource "vercel_project_environment_variable" "stripe_public" {
  project_id = vercel_project.this.id
  key        = "STRIPE_API_SECRET_KEY"
  value      = var.STRIPE_API_SECRET_KEY
  target     = ["production", "development"]
}
resource "vercel_project_environment_variable" "sendgrid_key" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_API_KEY"
  value      = var.SENDGRID_API_KEY
  target     = ["production", "development"]
}
resource "vercel_project_environment_variable" "sendgrid_from" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_FROM_EMAIL"
  value      = var.SENDGRID_FROM_EMAIL
  target     = ["production", "development"]
}
resource "vercel_project_environment_variable" "url" {
  project_id = vercel_project.this.id
  key        = "URL"
  value      = var.URL
  target     = ["production", "development"]
}
resource "vercel_project_environment_variable" "stripe_webhook_secret" {
  project_id = vercel_project.this.id
  key        = "STRIPE_WEBHOOK_SECRET"
  value      = var.STRIPE_WEBHOOK_SECRET
  target     = ["production", "development"]
}
