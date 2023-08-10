const express = require("express");
const {getContacts,postContacts,putContact, deleteContact}=require("../controllers/contactController");
const router = express.Router();

// Define your routes here
router.get('/',getContacts).post("/", postContacts);
// Define your routes here

// Define your routes here
router.put("/:id", putContact).delete("/:id", deleteContact);


module.exports = router;
