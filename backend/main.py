from fastapi import FastAPI, HTTPException, Header, Response, Request
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from io import BytesIO
import logging
import socket
import jwt
from jwt import PyJWKClient

gunicorn_logger = logging.getLogger('gunicorn.error')
logger.handlers = gunicorn_logger.handlers
if __name__ != "main":
    logger.setLevel(gunicorn_logger.level)
else:
    logger.setLevel(logging.DEBUG)

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace this with the actual origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_token(request: Request) -> str:
    authorization_header = request.headers.get("Authorization")
    if authorization_header is None or not authorization_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing Authorization header")

    token = authorization_header.split("Bearer ")[1].strip()
    return token

def verify_user(request):
    token = extract_token(request)

    url = "http://localhost:8080/realms/SOA/protocol/openid-connect/certs"
    jwks_client = PyJWKClient(url)
    signing_key = jwks_client.get_signing_key_from_jwt(token)
    try:
        data = jwt.decode(
            token,
            signing_key.key,
            audience="account",
            algorithms=["RS256"]
        )
        return data
    except jwt.ExpiredSignatureError:
        return Response(content = {"status_code":401, "message":"Expired Token"},status_code=401)

@app.get('/api/public')
def hello_world(request: Request):
    headers = str(request.headers)
    hostname = socket.gethostname()
    resp = f'''<h1>Hello, from the Flask App in Docker!</h1>\n
    This App is Running on Host: {hostname}
    #<p>{headers}</p>'''
    return Response(resp, status_code=200)

@app.get('/api/protected')
def test_token(request: Request):
    print(request.headers)
    token_data = verify_user(request=request)
    response = {"Result":"Success", "response_timestamp": datetime.now().isoformat(), "request_token":token_data}
    return response
