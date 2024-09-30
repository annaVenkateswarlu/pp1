Candidate Management and Admin Panel API

This project is a Node.js-based RESTful API that provides functionality for candidate management and administrative tasks such as candidate registration, login, assignment posting, meeting scheduling, and more. The API uses Express, MySQL, and JSON Web Tokens (JWT) for authentication.

Features

1.Candidate signup, login, and logout functionality
2.JWT-based authentication
3.Admin management, including admin signup, login, and team creation
4.Candidate submission form
5.Assignment posting for candidates
6.Scheduling meetings
7.Recruiting candidates through an admin panel

Technologies

1.Node.js
2.Express.js
3.MySQL
4.JSON Web Tokens (JWT)
5.CORS  (app.use(cors()); // Enable CORS for all routes)
6.Body Parser  (Body Parser is a middleware that parses incoming request bodies in a middleware before your handlers)

Database Setup

//To show database:

show databases;
 
create database your_database;

use your_database;

//users created automatically:

create table candidates(name varchar(100), email varchar(100), password varchar(100));

mysql> create table submissions(candidate_id int, data varchar(100));
Query OK, 0 rows affected (0.01 sec)

mysql> create table admins(name varchar(100), email varchar(100), password varchar(100));
Query OK, 0 rows affected (0.01 sec)

mysql> create table teams(name varchar(100));
Query OK, 0 rows affected (0.01 sec)

mysql> create table assignments(title varchar(100), description varchar(100));
Query OK, 0 rows affected (0.01 sec)

mysql> create table meetings(details varchar(100));
Query OK, 0 rows affected (0.01 sec)

create table applications(id int,candidate_id int,position varchar(100),status varchar(100),created_at Datetime,u
pdated_at Datetime)

INSERT INTO applications (position) VALUES ('Frontend Developer');

mysql> show tables;
+-------------------------+
| Tables_in_your_database |
+-------------------------+
| admins                  |
| assignments             |
| candidates              |
| meetings                |
| submissions             |
| teams                   |
| users                   |
+-------------------------+
7 rows in set (0.00 sec)

Installation

install pakages:

npm init -y
npm install
npm install express mysql2 body-parser cors jsonwebtoken
node server.js

Access the API at: http://localhost:3001/


API Explanation

Candidate APIs

1.Candidate Signup

Success: Returns a 201 Created status.
Failure: Returns a 400 Bad Request status due to validation errors.

2.Candidate Login

Success: Returns a 200 OK status with authentication tokens.
Failure: Returns a 401 Unauthorized status for incorrect credentials.

3.Candidate Logout

Success: Returns a 200 OK status.
Failure: Returns a 401 Unauthorized status for an invalid token.

4.Submit Form

Success: Returns a 200 OK status.
Failure: Returns a 400 Bad Request or 401 Unauthorized status.

5.Get Assignments

Success: Returns a 200 OK status with assignment data.
Failure: Returns a 401 Unauthorized or 404 Not Found status.

Admin APIs

6.Admin Signup

Success: Returns a 201 Created status.
Failure: Returns a 400 Bad Request status for validation errors.

7.Admin Login

Success: Returns a 200 OK status with authentication tokens.
Failure: Returns a 401 Unauthorized status for incorrect credentials.

8.Admin Logout

Success: Returns a 200 OK status.
Failure: Returns a 401 Unauthorized status for an invalid token.

9.Create Team

Success: Returns a 201 Created status.
Failure: Returns a 400 Bad Request status for validation errors.

10.Post Assignment

Success: Returns a 201 Created status.
Failure: Returns a 400 Bad Request status for missing fields.

11.Schedule Meeting

Success: Returns a 201 Created status.
Failure: Returns a 400 Bad Request status for invalid data.

12.Recruit Button

Success: Returns a 200 OK status for successful recruitment.
Failure: Returns a 401 Unauthorized or 404 Not Found status.

13. Apply for a Position

Success:Returns a 200 OK status if the application is submitted successfully.
Failure:
Returns a 401 Unauthorized status if the token is invalid or missing.
Returns a 404 Not Found status if the specified position does not exist.

Frontend Explanation

The frontend of the Candidate Management and Admin Panel provides a user-friendly interface for candidates to log in, sign up, and access their dashboard. Here's a breakdown of how each part works:

1.HTML Structure (index.html):

Welcome Page: Displays a welcome message and a logout button when logged in.

Login Form: Fields for email and password, along with error messages for failed logins.

Signup Form: Fields for name, email, and password, with error messages for signup issues.

JavaScript Functionality (script.js):

Form Switching: Manages visibility between login and signup forms.

Signup Process: Sends user data to the backend and alerts on success or error.

Login Process: Handles authentication and displays a personalized welcome message.

Logout Functionality: Resets to the login form upon logout.


Photos:

![About us](https://github.com/user-attachments/assets/3ac69a77-61cd-4bc6-a82f-9e6ecaa80feb)

![Login Page](https://github.com/user-attachments/assets/a1401557-7433-4ad9-9f23-33e8949a3460)


Thank you!
