variable "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" {
  type      = string
  sensitive = true
}
variable "STRIPE_API_SECRET_KEY" {
  type      = string
  sensitive = true
}
variable "SENDGRID_API_KEY" {
  type      = string
  sensitive = true
}
variable "SENDGRID_FROM_EMAIL" {
  type = string
}
variable "URL" {
  type = string
}
