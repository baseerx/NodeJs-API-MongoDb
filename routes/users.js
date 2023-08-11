const express=require('express')

const router=express.Router()

const {registerUser,loginUser,currentUser}=require("../controllers/userController")

const validateTokenHandler=require("../middleware/validatetokenHandler")

router.post('/', registerUser).post('/login', loginUser)
router.get("/currentuser", validateTokenHandler, currentUser);

module.exports=router