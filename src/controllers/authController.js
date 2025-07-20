import { createNewUser, updateUser } from "../models/user/userModel.js";
import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/sessionModel.js";
import {
  userAccountVerfiedNotification,
  userActivationEmail,
} from "../services/emailService.js";
import { userActivationTemplate } from "../services/emailTemplates.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { token } from "morgan";

export const createNewUserController = async (req, res, next) => {
  try {
    const userObj = req.body;
    const salt = await bcrypt.genSalt(10);
    userObj.password = await bcrypt.hash(userObj.password, salt);

    const user = await createNewUser(userObj);

    if (user?._id) {
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        // send activation email
        console.log(url);

        const emailId = await userActivationEmail({
          email: user.email,
          name: user.fName,
          url,
        });
        console.log(url);
      }

      const message =
        "we have sent you an email with the activation link. Please check your email.";
      return responseClient({ req, res, message });
    }

    throw new Error("Unable to create the account, try again later.");
  } catch (error) {
    console.log("Error while registering", error);
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "The email already exits, try different email";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const activatUserController = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    console.log(session);

    if (session?._id) {
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        userAccountVerfiedNotification({ email: user.email, name: user.fName });
        const message = "Your account has been verfied, you can log in";
        return responseClient({ req, res, message });
      }
    }

    const message = "Invalid token or token expired";
    const statusCode = 400;
    return responseClient({ req, res, message });
  } catch (error) {
    next(error);
  }
};
