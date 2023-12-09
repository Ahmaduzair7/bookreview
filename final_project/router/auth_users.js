const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
console.log(users)
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
for(let i=0; i<=users.length; i++){
if (username == users[i].username){
  return false
}}}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const user = users.find( (record) => record.username === username && record.password === password);
if(user){
  return true
}else return false;
}
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password}= req.body;
  authenticatedUser(username,password)
  if(authenticatedUser)(
    res.send("Logged in")
  )
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let {isbn} = req.params;
  let review = req.body;
  isbn =Number(isbn)
  if(authenticatedUser = true){
    if (isbn>10 || isbn<=0){
      res.send("This number is not in the list")
    }else {
      books[isbn].reviews = review;
      res.send(books[isbn])
    }
  }else {
    res.send("you are not authorize")
  }
 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
