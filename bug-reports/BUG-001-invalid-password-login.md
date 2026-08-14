# BUG-001: Login API Accepts Invalid Password

## Summary

The login API returns HTTP 200 and a token when a valid user email is submitted with an incorrect password.

## Environment

- API: ReqRes
- Endpoint: POST /api/login
- Test Automation: Playwright
- Method: POST
- Test Date: August 13, 2026
- Severity: High
- Priority: High

## Preconditions

A valid ReqRes test email is available:

`eve.holt@reqres.in`

## Steps to Reproduce

1. Send a POST request to `/api/login`.
2. Use the following request body:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "wrong-password"
}

Submit the request.
Check the HTTP response status and response body.

Expected Result

The API should reject the login attempt because the password is incorrect.

Expected HTTP status:

400 Bad Request

The response should contain an error message, for example:

{
  "error": "Invalid password"
}

Actual Result

The API returns:

200 OK

and provides a token in the response body.

Example:

{
  "token": "..."
}
Impact

An invalid password is accepted for a valid user email, allowing authentication to succeed when it should fail.

This could represent a serious authentication and security issue if reproduced in a production authentication system.

Evidence

Automated test:

tests/negative/negative-scenarios.spec.js

Test scenario:

should process login request with an invalid password

Test result:

Expected: 400
Received: 200
Status

Open

Severity

High

Priority

High







