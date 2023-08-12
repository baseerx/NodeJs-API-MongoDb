const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel');
const userModel=require('../models/userModel');
const mongoose=require('mongoose');
const getContacts=asyncHandler(
    async (req, res) => {
        // Your route logic here

      const contactsWithUserData = await Contact.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId("64d5184fa07aba73ac1ed59c"),
          },
        },
        {
          $lookup: {
            from: "users", // Name of the User collection
            localField: "user_id",
            foreignField: "_id",
            as: "user_data",
          },
        },
        {
          $unwind: "$user_data",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phone: 1,
            user_email: "$user_data.email",
            user_password: "$user_data.password",
          },
        },
      ]);
    res.status(201).json({ contacts: contactsWithUserData });
})
const postContacts = asyncHandler(async (req, res) => {
 
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(422).json({ error: "Please add all the fields" });
    throw new Error("Please add all the fields");
    }
    const userid=userModel.findById(req.user._id);
    if(!userid) {
        res.status(404).json({error: "User not found"});
        throw new Error("User not found");
    }
    Contact.create({
        user_id: req.user._id,
        name,
        email,
        phone
  });
  // Your route logic here
  res.status(201).json({ message: "contact record created successfully" });
});
const putContact=asyncHandler(
    async (req, res) => {
        const contactUpdate=await Contact.findById(req.params.id)
        if(!contactUpdate) {
            res.status(404).json({error: "Contact not found"});
            throw new Error("Contact not found");
        }
        const {name, email, phone}=req.body
        await Contact.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone
        }, {
            new: true,
            runValidators: true
        })
        res.status(201).json({message: "contact updated successfully", oldcontact:contactUpdate});
  // Your route logic here
}
)

const deleteContact=asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404).json({error: "Contact not found"});
        throw new Error("Contact not found");
    }
    await contact.deleteOne();
  // Your route logic here
  res.send(`contact deleted successfully: ${contact}`);
});
    

module.exports = { getContacts, postContacts, putContact, deleteContact };
