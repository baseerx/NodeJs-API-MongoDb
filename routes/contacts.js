const express = require("express");
const {getContacts,postContacts,putContact, deleteContact}=require("../controllers/contactController");
const validateTokenHandler=require("../middleware/validatetokenHandler");
const router = express.Router();

// Define your routes here
router.get('/',validateTokenHandler,getContacts).post("/",validateTokenHandler, postContacts);
// Define your routes here

// Define your routes here
router.put("/:id", putContact).delete("/:id", deleteContact);


module.exports = router;
