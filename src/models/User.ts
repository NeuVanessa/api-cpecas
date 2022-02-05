import { Schema, model } from "mongoose";
import { User } from "../interfaces/User";

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  passwordCheck: { type: String, required: true, minlength: 5 },
  type: { type: String, required: true },
  avatar: { type: String, required: true },
  // end: [{ type: Array, required: true }]
});

export const UserModal = model<User>("User", schema);
