
# Configure the GitHub Provider
provider "github" {}

resource "github_repository" "this" {
  name        = "stripe-checkout-classes"
  description = "Codebase for selling online classes via zoom and stripe"

  visibility = "public"


}
