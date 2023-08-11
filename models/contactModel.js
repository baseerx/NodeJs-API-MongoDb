const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    user_id: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter a user id"],
    },
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone"],
    }
}, {
    timestamps: true

});

module.exports=mongoose.model('Contact', contactSchema);