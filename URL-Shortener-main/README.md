🚀 Scalable URL Shortener

A production-ready URL Shortening service built with Node.js, Express, and MongoDB, featuring analytics, expiration handling, input validation, duplicate detection, and a clean MVC-style structure.
The project demonstrates backend engineering, RESTful API design, and production awareness, rather than just a demo application.

✨ Features

🔗 Shorten long URLs into compact, unique short links

🔁 Fast redirection from short URL to original URL

📊 Click analytics (tracks number of redirects)

⏰ URL expiration support (expired links return proper HTTP status)

✅ Input validation for URLs

♻️ Duplicate URL handling (avoids redundant records)

🗑️ Delete / revoke short URLs

🖥️ Minimal UI for demonstration and testing

🛠️ Tech Stack

Backend

Node.js

Express.js

RESTful APIs

Database

MongoDB (Mongoose ODM)

Templating / UI

EJS

Bootstrap 5

Tooling

Git

Postman

(Docker & Cloud deployment will be added in later stages)

📂 Project Structure
.
├── models/
│   └── shorturl.js        # MongoDB schema for URLs
├── views/
│   └── index.ejs          # Minimal UI to test backend features
├── server.js              # Express server and route definitions
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/JaideepBalde/url-shortener.git
cd url-shortener

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the project root:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Url_Shortner
BASE_URL=http://localhost:5000


You can replace MONGO_URI with MongoDB Atlas when deploying.

4️⃣ Start the server
node server.js


Server will start on:

http://localhost:5000

🔄 API Behavior (RESTful Design)
Create Short URL

POST /shorturls

Validates input URL

Prevents duplicate entries

Redirect

GET /:shortCode

Redirects to original URL

Increments click count

Returns 410 Gone if URL is expired

Delete Short URL

POST /:id

Deletes the URL entry from database

📊 HTTP Status Codes Used
Scenario	Status Code
URL created	201 Created
Invalid URL input	400 Bad Request
Short URL not found	404 Not Found
URL expired	410 Gone
Deleted successfully	204 No Content

Using 410 Gone for expired URLs follows REST best practices.

🧠 Design Decisions

Expiration Handling
URLs optionally expire based on timestamp, enabling real-world use cases like temporary links.

Duplicate Detection
Prevents unnecessary database growth by reusing existing short URLs for the same long URL.

Minimal UI
UI is intentionally lightweight; focus is on backend logic and correctness.

Environment-based Configuration
Base URL and database connections are environment-driven to support local and cloud deployments.

📸 Screenshots
<img width="1694" height="652" alt="image" src="https://github.com/user-attachments/assets/cf427c17-aa4f-4186-bc9a-da80c3a744a9" />

Homepage with URL list and analytics
<img width="1713" height="922" alt="image" src="https://github.com/user-attachments/assets/78e359a9-3f2f-48eb-bf7a-dc498d37b053" />

Expired URL behavior

Short URL redirection

🚀 Future Enhancements

Dockerized deployment

Cloud hosting (AWS / Render)

CI/CD pipeline

Rate limiting

Caching for read-heavy traffic

👤 Author

Jaydeep Balde
GitHub: https://github.com/JaideepBalde

