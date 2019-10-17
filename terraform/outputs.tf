output "bucket_domain_name" {
  value       = aws_s3_bucket.portal_bucket.bucket
  description = "Bucket Name"
}
