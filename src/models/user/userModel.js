import userSchema from "./userSchema.js";

//creating a new user 
export const createNewUser = (userobj) => {
    return userSchema(userobj).save();
}

export const updateUser = (filter, update)=> {
    return userSchema.findOneAndUpdate(filter, update, {new: true});
}