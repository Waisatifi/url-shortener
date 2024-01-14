
# Redirect to longurl

GET /api/v1/shorturls/123456 HTTP/1.1
Content-Type: application/json

{
 {

 }
}

# Success response

### Condition: if everythoing is OK, it will redirect


HTTP/1.1 301 Moved Permanently
Location: http://www.amazon.com/123456

# Failed

HTTP/1.1 404 The server can not find the requested resource.
Content-Type: application/json

{
  "error": " the server can not find the requested resource"
}
