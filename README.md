# Social Media API

![Social Media API Logo]

## Overview

This is a simple Social Media API built using Node.js and Express. The API provides endpoints for user management, posts, comments, friendships, likes, and OTP (One-Time Password) functionality. It uses JSON Web Tokens (JWT) for authentication.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Posts](#posts)
  - [Comments](#comments)
  - [Friendships](#friendships)
  - [Likes](#likes)
  - [OTP](#otp)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- MongoDB server running

### Installation

1. **Clone the repository:**

   ```bash
   git clone (https://github.com/Faizanamd/Social-Media-API)https://github.com/Faizanamd/Social-Media-API


   ## API Endpoints

### Users

- **POST /api/users/signup**

  Creates a new user account.

- **POST /api/users/signin**

  Authenticates a user.

- **GET /api/users/logout**

  Logs out the authenticated user.

- **GET /api/users/logout-all-devices**

  Logs out the user from all devices.

- **GET /api/users/get-details/:userId**

  Gets details of a specific user.

- **GET /api/users/get-all-details**

  Gets details of all users.

- **PUT /api/users/update-details/:userId**

  Updates details of a specific user.

### Posts

- **GET /api/posts/all**

  Gets all posts.

- **GET /api/posts/:postId**

  Gets a post by its ID.

- **GET /api/posts/**

  Gets posts by user ID.

- **POST /api/posts/**

  Creates a new post.

- **DELETE /api/posts/:postId**

  Deletes a post by its ID.

- **PUT /api/posts/:postId**

  Updates a post by its ID.

### Comments

- **GET /api/comments/:postId**

  Gets comments for a specific post.

- **POST /api/comments/:postId**

  Adds a new comment to a post.

- **DELETE /api/comments/:commentId**

  Deletes a comment by its ID.

### Friendships

- **GET /api/friends/get-friends/:userId**

  Gets the friends of a specific user.

- **GET /api/friends/get-pending-requests**

  Gets pending friendship requests.

- **GET /api/friends/toggle-friendship/:friendId**

  Toggles friendship status with a user.

- **POST /api/friends/response-to-request/:friendId**

  Responds to a friendship request.

### Likes

- **GET /api/likes/:postId**

  Gets the likes for a specific post.

- **POST /api/likes/toggle/:postId**

  Toggles a like on a post.

## OTP

- **POST /api/otp/send**

  Sends an OTP for verification.

- **POST /api/otp/verify**

  Verifies an OTP.

- **POST /api/otp/reset-password**

  Resets the user's password using OTP.

