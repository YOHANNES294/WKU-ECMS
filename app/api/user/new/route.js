import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    userId,
    firstname,
    middlename,
    lastname,
    password,
    collegeName,
    departmentName,
    staffId,
    officeName,
    year,
    role,
    privilege,
    email,
    blockNo,
    status,
    verificationCode,
    director,
    staffType,
  } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connectToDB();
    const newUser = new User({
      userId,
      firstname,
      middlename,
      lastname,
      password: hashedPassword,
      collegeName,
      departmentName,
      staffId,
      officeName,
      year,
      role,
      privilege,
      email,
      blockNo,
      status: "active",
      verificationCode,
      director,
      staffType,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new user", { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    const { objectId, email, userId, password, profilePicture, blockNo } =
      await request.json();

    await connectToDB();

    const updatedFields = {};

    // Check if there are updated fields
    if (email) {
      updatedFields.email = email;
    }
    if (password) {
      updatedFields.password = password;
    }
    if (profilePicture) {
      updatedFields.profilePic = profilePicture;
    }
    if (blockNo) {
      updatedFields.blockNo = blockNo;
    }

    // Find and update the user document based on userId
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("Updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update user", { status: 500 });
  }
};