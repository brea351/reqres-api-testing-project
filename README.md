# ReqRes API Testing Project

A comprehensive API automation testing project built with **Playwright** and **JavaScript** against the ReqRes REST API.

The project demonstrates API test automation, positive and negative testing, boundary testing, pagination validation, authentication testing, API chaining, response/schema validation, reusable API services, reporting, bug documentation, and CI/CD integration with GitHub Actions.

---

##  Project Overview

This project was developed as an API testing capstone using Playwright's API testing capabilities.

The objective is to validate REST API functionality across multiple endpoints and demonstrate professional QA automation practices.

### Application Under Test

**ReqRes API**

Base URL:

```text
https://reqres.in

Tech Stack

Playwright
JavaScript
Node.js
REST API
Git
GitHub
GitHub Actions
JSON
dotenv
 

Test Coverage

The project contains 62 automated API tests covering the following areas.

User Management
Retrieve users
Retrieve a single user
Create a user
Update a user using PUT
Partially update a user using PATCH
Delete a user
Authentication
Successful login
Invalid email
Invalid password
Missing email
Missing password
Empty credentials
Registration
Successful registration
Missing password
Missing email
Invalid registration data
Empty credentials
Pagination
First page
Second page
Pagination metadata
User IDs
Email validation
Required profile fields
Large page numbers
Non-numeric page values
Boundary page values
Negative and Boundary Testing
User ID 0
Negative user IDs
Very large user IDs
Non-numeric user IDs
Page zero
Negative page numbers
Very large page numbers
Invalid page values
Invalid login credentials
Invalid registration data
API Chaining

The project demonstrates workflows where data returned from one API request is used in subsequent requests.

Examples:

Create User → Update User
Create User → PATCH User
Create User → Delete User
Create User → Update User → Delete User
Response and Schema Validation

Response validation includes:

HTTP status codes
Required response properties
Data types
User object structure
List response structure
Create response structure
Update response structure
PATCH response structure
Login response structure
Registration response structure
Error response structure
 

Test Summary
Test Area	 Tests
User List	 1
Single User	 3
Create User	 3
PUT Update	 3
PATCH Update	3
Delete User	 4
Login	     4
Registration	4
Pagination	  8
API Chaining	4
Negative & Boundary	 15
Response & Schema Validation	10
Total	62


Project Structure
reqres-api-testing-project/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── bug-reports/
│   └── BUG-001-login-invalid-password.md
│
├── test-data/
│   └── users.json
│
├── tests/
│   ├── auth/
│   │   ├── login.spec.js
│   │   └── register.spec.js
│   │
│   ├── chaining/
│   │   └── api-chaining.spec.js
│   │
│   ├── negative/
│   │   └── negative-scenarios.spec.js
│   │
│   ├── pagination/
│   │   └── pagination.spec.js
│   │
│   ├── users/
│   │   ├── list-users.spec.js
│   │   ├── single-user.spec.js
│   │   ├── create-user.spec.js
│   │   ├── update-user.spec.js
│   │   ├── patch-user.spec.js
│   │   └── delete-user.spec.js
│   │
│   └── validation/
│       └── response-schema.spec.js
│
├── utils/
│   └── api-client.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md


 Installation

Clone the repository:

git clone <YOUR_GITHUB_REPOSITORY_URL>

Navigate into the project:

cd reqres-api-testing-project

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install


 Environment Configuration

Create a .env file in the project root.

Use .env.example as a template:

BASE_URL=https://reqres.in
REQRES_API_KEY=your_reqres_api_key_here

Replace the placeholder with your actual ReqRes API key.

Security

The .env file is excluded from Git using .gitignore.

Real API keys and secrets must never be committed to the repository.

▶ 

Running the Tests

Run the complete test suite:

npx playwright test

Run a specific test file:

npx playwright test tests/users/list-users.spec.js

Run tests in headed mode:

npx playwright test --headed

Run tests using a specific folder:

npx playwright test tests/users
 

Test Reports

After test execution, generate/open the Playwright HTML report with:

npx playwright show-report

The project is configured to capture:

HTML reports
Screenshots on failure
Trace files on failure
Video recordings on failure
 

CI/CD

The project uses GitHub Actions to automatically execute the Playwright test suite.

The workflow is located at:

.github/workflows/playwright.yml

The workflow:

Checks out the repository
Sets up Node.js
Installs project dependencies
Installs Playwright browsers
Executes the automated test suite
Uploads the Playwright report as a workflow artifact

API credentials are provided through GitHub Actions secrets rather than being stored in the source code.

 Bug Reporting

During testing, an authentication behavior was identified and documented.

BUG-001 — Login API Accepts Invalid Password

Location:

bug-reports/BUG-001-login-invalid-password.md

The automated test initially expected HTTP 400 for an invalid password but the API returned HTTP 200 with a token.

The behavior was documented for investigation rather than silently removing the failed test.

 Test Architecture

The project uses a reusable API service layer through:

utils/api-client.js

The ReqResApi class centralizes API operations such as:

getUsers()
getUser()
createUser()
updateUser()
patchUser()
deleteUser()
login()
register()

This reduces duplicated request logic inside individual test files and makes the test suite easier to maintain.


 QA Practices Demonstrated

This project demonstrates:

API functional testing
Positive testing
Negative testing
Boundary testing
Validation testing
Authentication testing
Pagination testing
CRUD testing
API chaining
Response validation
Schema validation
Reusable API service design
Environment configuration
Secure secret management
Automated reporting
CI/CD integration
Defect documentation

 Author

Tosin A. Williams

Software Quality Assurance Engineer

Focused on API Automation, Data QA, Database Testing, and Quality Engineering.