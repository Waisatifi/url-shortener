# Create new tiny url

POST /api/v1/shorturls HTTP/1.1
Host: tinyurl.com
Content-Type: application/json

{
    {
	"longurl": "http://www.amazon.com/123456"
    }
}

# Success response

HTTP/1.1 201 Created
Content-Type: application/json
Location: https://tinyurl.com/api/v1/123456


{
    "shorturl": "tinyurl/1234654",
    "longurl": "http://www.amazon.com/123456"
}

# Failed 

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Missing longUrl in the request body"
}

