const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [2, "First Name should be atleast 2 characters long"],
        lowercase: true,
        trim: true,
        maxlenght: [25, "First Name should be less than or equal to 25 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minlength: [2, "Last Name should be atleast 2 characters long"],
        lowercase: true,
        trim: true,
        maxlenght: [25, "Last Name should be less than or equal to 25 characters"]
    },

    mobileNumber: {
        type: String,
        trim: true,
        maxlenght: [10, "Phone number should be length of 10"],
        minlength: [10, "Phone number should be length of 10"],
        unique: [true, "Phone number is already used"],
        required: [true, "Phone number should be required"]
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provided"],
        unique: [true, "Email is already used"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"] //regex  --> regular expression
    }, 

    password: {
        type: String,
        required: [true, "Password should be required"],
        minlength: [6, "Password should be minimum six charaters long"]
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function() {
    // here you can modify your user before it is saved in database
    console.log("Entering in pre save hook");
    console.log(this);
    const hassedPassword = await bcrypt.hash(this.password, 10);
    console.log(hassedPassword);
    this.password = hassedPassword;
    console.log(this);
    console.log("exit the pre save hook and now creating user");
})

const User = mongoose.model("User", userSchema); //collection

module.exports = User;