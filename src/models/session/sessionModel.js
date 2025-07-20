import sessionSchema from "./sessionSchema.js";

// creating a new schema
export const createNewSession = (sessionObj) => {
    return sessionSchema(sessionObj).save();
}

export const deleteSession = (filter)=> {
    return sessionSchema.findOneAndDelete(filter);
}