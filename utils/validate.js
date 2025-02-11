const validator = require("validator");

const validateSignUpData = (req) => {
const {firstName,lastName,emailId,password} = req.body
if(!firstName || !lastName)
{
    throw new Error("Please enter valid name")
}
else if(!validator.isEmail(emailId))
{
    throw new Error("Email id is not in format")
}
else if(!validator.isStrongPassword(password))
{
    throw new Error("password is not strong")

}
} 

module.exports = validateSignUpData;