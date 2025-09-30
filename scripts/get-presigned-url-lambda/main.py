import json
import logging
import boto3

s3_client = boto3.client("s3")
logger = logging.getLogger()
logger.setLevel("INFO")

BUCKET_NAME = "query-export-files-bucket"
EXPORT_TYPE_MAPPING = {
    "anki": ("anki", "txt", "anki_export.txt"),
    "notion": ("notion", "md", "notion_export.md"),
    "obsidian": ("obsidian", "md", "obsidian_export.md")
}

def get_specific_presigned_url_parameters(export_type: str) -> tuple[str, str, str]:
    if export_type not in EXPORT_TYPE_MAPPING:
        logger.error(f"export type is not in the export type mapping, export type: {export_type}")
        raise Exception("export type not supported")

    return EXPORT_TYPE_MAPPING[export_type]

def get_presigned_url_to_fetch_from_s3(book_id: str, export_type: str) -> str:
    EXPIRY_TIME = 300

    try:
        folder_path, file_type, exported_file_name = get_specific_presigned_url_parameters(export_type)
        response = s3_client.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": BUCKET_NAME,
                "Key": f"{folder_path}/{book_id}.{file_type}",
                "ResponseContentDisposition": f"attachment; filename={exported_file_name}"
            },
            ExpiresIn=EXPIRY_TIME
        )
        return response
    except Exception as e:
        logger.error(f"encountered error while trying to generate presigned url: {e.message}")
        raise e

def lambda_handler(event, context):
    BOOK_ID_KEY = "bookId"
    EXPORT_TYPE_KEY = "exportType"

    event = json.loads(event["body"])
    logger.info(f"current event: {event}")
    book_id = event[BOOK_ID_KEY]
    export_type = event[EXPORT_TYPE_KEY]

    try:
        presigned_url = get_presigned_url_to_fetch_from_s3(book_id, export_type)
    except Exception:
        logger.error(f"failed to generate presigned url to fetch object from s3")
        return {
            "statusCode": 400,
            "body": {
                "presignedUrl": "ERROR"
            }
        }
    
    logger.info(f"successfully generated presigned url to fetch object from s3")
    return {
        "statusCode": 200,
        "body": {
            "presignedUrl": presigned_url
        }
    }