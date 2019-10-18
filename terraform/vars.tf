variable "AWS_REGION" {
  default = "us-east-1"
}

variable "CLUSTER_NAME" {
  default = "ctake-eks-demo"
  type    = "string"
}

variable "write_aws_auth_config" {
  description = "Whether or not to output an auth K8s config-map file."
  default = false
}

variable "write_kubeconfig" {
  description = "Whether or not to output a K8s config file."
  default = false
}
