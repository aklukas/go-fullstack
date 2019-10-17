resource "aws_s3_bucket" "portal_bucket" {
  bucket  = "ctake-users"
  acl     = "public-read"
  policy  = file("./policy.json")

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
