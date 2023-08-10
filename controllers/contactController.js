const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel')
const getContacts=asyncHandler(
    async (req, res) => {
  // Your route logic here
        const contacts = await Contact.find();
    res.status(201).json({contacts:contacts});
})
const postContacts = asyncHandler(async (req, res) => {
 
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(422).json({ error: "Please add all the fields" });
    throw new Error("Please add all the fields");
    }
    
    Contact.create({
        name,
        email,
        phone
  });
  // Your route logic here
  res.status(201).json({ message: "Contacts API endpoint for post" });
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
