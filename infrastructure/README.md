# Online-Fitness-Classes

This is a Next.js project hosted on vercelc.com in conjunction with Stripe for payments and SendGrid for sending emails.

Visit: <a href="https://kurse.michaela-suessbauer.de">kurse.michael-suessbauer.de<a/>

## Terraform

<!-- BEGINNING OF PRE-COMMIT-TERRAFORM DOCS HOOK -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_github"></a> [github](#requirement\_github) | ~> 5.0 |
| <a name="requirement_vercel"></a> [vercel](#requirement\_vercel) | ~> 0.4 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_github"></a> [github](#provider\_github) | 5.36.0 |
| <a name="provider_vercel"></a> [vercel](#provider\_vercel) | 0.15.1 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [github_repository.this](https://registry.terraform.io/providers/integrations/github/latest/docs/resources/repository) | resource |
| [vercel_project.this](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project) | resource |
| [vercel_project_environment_variable.sendgrid_from](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) | resource |
| [vercel_project_environment_variable.sendgrid_key](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) | resource |
| [vercel_project_environment_variable.stripe_public](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) | resource |
| [vercel_project_environment_variable.stripe_secret](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) | resource |
| [vercel_project_environment_variable.url](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"></a> [NEXT\_PUBLIC\_STRIPE\_PUBLISHABLE\_KEY](#input\_NEXT\_PUBLIC\_STRIPE\_PUBLISHABLE\_KEY) | n/a | `string` | n/a | yes |
| <a name="input_SENDGRID_API_KEY"></a> [SENDGRID\_API\_KEY](#input\_SENDGRID\_API\_KEY) | n/a | `string` | n/a | yes |
| <a name="input_SENDGRID_FROM_EMAIL"></a> [SENDGRID\_FROM\_EMAIL](#input\_SENDGRID\_FROM\_EMAIL) | n/a | `string` | n/a | yes |
| <a name="input_STRIPE_API_SECRET_KEY"></a> [STRIPE\_API\_SECRET\_KEY](#input\_STRIPE\_API\_SECRET\_KEY) | n/a | `string` | n/a | yes |
| <a name="input_URL"></a> [URL](#input\_URL) | n/a | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_vercle_project"></a> [vercle\_project](#output\_vercle\_project) | n/a |
<!-- END OF PRE-COMMIT-TERRAFORM DOCS HOOK -->
