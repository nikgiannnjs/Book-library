# Book library

## Introduction

A simple Book library application built with Node.js, Express, and MongoDB.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Nodemailer

## Installation

1. Clone the repository:
   `git clone https://github.com/nikgiannnjs/Book-library.git`

2. Navigate to the project directory:
   `cd Book-Library`

3. Install dependencies:
   `npm install`

4. Set up MongoDb database:

   - Create an .env file
   - Create an environment DATABASE_URL = youMongoDBConnectionString
   - node seed.js (to seed the database with demo books)

5. Start the application:
   `npm start`

## Usage

A user creates their profile by providing personal info based on the user schema (name , email ,password and password confirmation). The user can see all the books in the database, search for a book based on specific book id's, add new books and update them.

## API Endpoints

### Authentication - Users

- `POST` `/bookstore/users/userSignIn`\
   Creates a new user. Requires a JSON body:

  ```js
  {
    "name": "testName",
    "email": "test@gmail.com",
    "password": "testPassword",
    "passwordConfirm":"testPassword"
  }
  ```

- `POST` `/bookstore/users/usersLogIn`\
  User login. Requires a JSON body:

  ```js
  {
    "email": "test@gmail.com",
    "password": "userPassword"
  }
  ```

- `PATCH` `/bookstore/users/resetPassword/token`\
  Reset password. Requires a JSON body and the user token as a parameter:

  ```js
  {
    "password": "newPassword",
    "passwordConfirm": "newPassword"
  }
  ```

- `POST` `/bookstore/users/forgotPassword`\
  Forgot password. Requires a JSON body:

  ```js
  {
    "email": "test@gmail.com"
  }
  ```

- `PATCH` `/bookstore/users/updateUsernameoremailById/:id`\
  Changes the username or email. Requires a JSON body and the user id as a parameter:

  ```js
  {
   "name": "userName",
   "email": "test.@gmail.com"
  }
  ```

- `GET` `/bookstore/users/allUsers`\
  Request all users in db.

- `GET` `/bookstore/users/userById/:id`\
  Find user by id. Requires a user's id as a parameter.

- `DELETE` `/bookstore/users/deleteUserById/:id`\
  Delete user by id. Requires a user id as a parameter.

### Books

- `GET` `/bookstore/allBooks`\
  Gets all books in the database.

- `GET` `/bookstore/bookById/:id`\
  Get book by id. Requires a book id as a parameter.

- `POST` `/bookstore/insertBookinDB`\
  Add a new book in the batabase. Requires a JSON body:

  ```js
  {
    "title": "title",
    "author": "author",
    "pages": "pages number",
    "genres":["genre1", "genre2", " "...],
    "description": "description",
    "rating": rating
  }
  ```

- `PATCH` `/bookstore/updateBookById/:id`\
  Update a book by id. Requires a JSON body and a book id as a parameter.

  ```js
  {
  "fieldToUpdate": "value",
  }
  ```

- `DELETE` `/bookstore/deleteBookById/:id`\
  Delete book by id. Requires a book id as a parameter.

## Database Schema

- **Users**

  - `name`: String (required, trimmed)
  - `email`: String (required, unique, lowercase)
  - `password`: String (required, minimum 8 characters, not selectable)
  - `passwordConfirm`: String (must match `password`)

- **Books**
  - `title`: String (required, trimmed)
  - `author`: String (required, trimmed)
  - `pages`: Number (required)
  - `genres`: Array (optional)
  - `description`: String (required)
  - `rating`: Number (min: 0, max: 10)
