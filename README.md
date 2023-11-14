Social Media API
Welcome to the Social Media API, a robust and scalable Node.js application built with Express.js. This API provides a foundation for developing social networking features such as user management, post creation, comments, friendships, likes, and secure authentication using JWT.

Table of Contents
Technologies
Installation
Usage
API Endpoints
Technologies
Node.js
Express.js
MongoDB with Mongoose
bcrypt for password hashing
jsonwebtoken for secure authentication
dotenv for environment variables
multer for file uploads
uuid for unique identifiers
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of the project and add your configuration details:

env
Copy code
DATABASE_URL=your-mongodb-url
JWT_SECRET=your-jwt-secret
# Add other necessary variables
Start the application:

bash
Copy code
npm start
Usage
Access the Social Media API at http://localhost:your-port. The default landing page welcomes you to the Social Media API.

API Endpoints
Users
POST /api/users/signup

Create a new user account.
POST /api/users/signin

Authenticate and sign in.
GET /api/users/logout

Log out the current user.
GET /api/users/logout-all-devices

Log out the user from all devices.
GET /api/users/get-details/:userId

Get specific user details.
GET /api/users/get-all-details

Get details of all users.
PUT /api/users/update-details/:userId

Update user details.
Posts
GET /api/posts/all

Get all posts.
GET /api/posts/:postId

Get a post by post ID.
GET /api/posts/

Get posts by user ID.
POST /api/posts/

Create a new post.
DELETE /api/posts/:postId

Delete a post by post ID.
PUT /api/posts/:postId

Update a post by post ID.
OTP
POST /api/otp/send

Send OTP for verification.
POST /api/otp/verify

Verify the provided OTP.
POST /api/otp/reset-password

Reset the user password.
Likes
GET /api/likes/:id

Get likes for a specific post.
POST /api/likes/toggle/:id

Toggle a like for a post.
Friendships
GET /api/friends/get-friends/:userId

Get friends of a user.
GET /api/friends/get-pending-requests

Get pending friendship requests.
GET /api/friends/toggle-friendship/:friendId

Toggle friendship with another user.
POST /api/friends/response-to-request/:friendId

Respond to a friendship request.
