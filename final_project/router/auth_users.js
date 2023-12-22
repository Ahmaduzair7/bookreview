const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
for(let i=0; i<=users.length; i++){
if (username == users[i].username){
  return false
}}}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
var user = users.find( (record) => record.username === username && record.password === password);
if(user){
  return true
}else return false;
}
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password}= req.body;
  authenticatedUser(username,password)
  if(authenticatedUser){
    res.send("Customer is successfully Logged in")
  } else res.send("You are not authorize")
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Write your code here
  let { isbn } = req.params;
  const { username, password, reviews } = req.body;

  // Assuming authenticatedUser is a function that returns a boolean
  const isUserAuthenticated = authenticatedUser(username, password);

  isbn = Number(isbn);

  if (isUserAuthenticated) {
    if (isbn < 0 || isbn >= books.length) {
      res.send("Invalid ISBN");
    } else {
      if (!books[isbn].reviews) {
        books[isbn].reviews = {};
      }
      books[isbn].reviews = reviews;
      res.send(`The review for the book with ISBN ${isbn} has been added/updated`);
    }
  } else {
    res.status(403).send("Unauthorized");
  }
});
// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Write your code here
  let { isbn } = req.params;
  const { username, password } = req.body;

  // Assuming authenticatedUser is a function that returns a boolean
  const isUserAuthenticated = authenticatedUser(username, password);

  isbn = Number(isbn);

  if (isUserAuthenticated) {
    if (isbn < 0 || isbn >= books.length) {
      res.send("Invalid ISBN");
    } else{
      books[isbn].reviews = {};
      res.send(`The review for the book with ISBN ${isbn} has been deleted by the user`);
    }
  } else {
    res.status(403).send("Unauthorized");
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
