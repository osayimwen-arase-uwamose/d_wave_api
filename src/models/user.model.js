import { Schema, model } from "mongoose";

const userSchema = new Schema({ 
  firstName: { 
    type: String,
    required: true,
  },

  middleName: { 
    type: String,
  },

  lastName: { 
    type: String,
    required: true,
  },

  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },

  passwordHash: { 
    type: String,
    default: null,
  },

  role: { 
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { 
  timestamps: true,
});

export const User = model("User", userSchema); 
