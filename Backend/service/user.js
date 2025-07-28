const userModule = require('../modules/user');

const createUser = async({
    fullName, email , password
})=>{
    if(!fullName || !email || !password)
    {
        throw new Error("All fildes require !!");
    }
    const hashPassword = await userModule.hashPassword(password);

    const user = await userModule.create({
        fullName,
        email,
        password : hashPassword,
    });
    return user;
}

module.exports ={
    createUser
}