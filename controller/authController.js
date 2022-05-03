import express from "express";
import User from "../model/userSchema.js";
import asyncHandler from "express-async-handler";

export const registerUser = async (req, res) => {
  const { name, email, password, role, category, image, phone } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(
      new ErrorResponse(`User already exists, please login intead`, 400)
    );
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const output = `<p> 
  <a href="${process.env.HTMLLINK}/api/v1/verify/user/${user._id}" target="_blank" rel="noopener noreferrer">Verify Your Account</a>.</p>
 <h3>Message</h3>
  <h1>Thank you </h1>
`;

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: `${process.env.NODEEMAIL}`,
      pass: `${process.env.NODEPASSWORD}`,
    },
  });

  var mailOptions = {
    from: `"No reply 👻" "noreplysaffron12@gmail.com"`,
    to: `${email} `,
    subject: "User varification ",
    text: "Click this link to verify your account",
    html: output,
  };

  await transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      await User.findByIdAndDelete(user._id);
      res.json({
        success: false,
        error,
      });
    } else {
      res.json({
        success: true,
        massage: "Verification Email Sent",
      });
    }
  });
};
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // validate email and password //
  if (!email || !password) {
    return next(new ErrorResponse(`Please Provide An Email And Password`, 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }
  // check if password matches //
  const match = await user.matchPassword(password);
  if (!match) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }
  // send a cookie along with token response //
  if (user.verified == true) {
    sendTokenResponse(user, 200, res);
  } else {
    res.json({
      sucess: false,
      massage: "user not verified",
    });
  }
});
