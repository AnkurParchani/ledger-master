const jwt = require("jsonwebtoken");
const util = require("util");

const AppError = require("../utils/appError");
const Customer = require("./../models/customerModel");
const User = require("./../models/userModel");

exports.checkAlreadyCustomer = async (req, res, next) => {
  req.body.user = req.user._id;

  if (req.body.name && req.body.area && req.body.firmName) {
    const alreadyCustomer = await Customer.find({
      name: req.body.name.toLowerCase(),
      area: req.body.area.toLowerCase(),
      firmName: req.body.firmName.toLowerCase()
    }).where({ user: req.user._id });

    if (alreadyCustomer[0]) {
      return next(
        new AppError(
          409,
          "There is already a person with same Name, Area and Firmname"
        )
      );
    }
  }
  next();
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError(401, "Please provide username and password"));
    }

    const user = await User.findOne({ username, password });
    if (!user) return next(new AppError(401, "Invalid username or password"));

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: "success",
      token,
      message: "Logged in! Welcome"
    });
  } catch (err) {
    console.log("Error from login controller", err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Getting the token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // If there's no token
    if (!token)
      return res.status(401).json({
        status: "failed",
        message: "please login"
      });

    // Decoding the token
    const decode = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // Appending the user according to the token
    req.user = await User.findById(decode.userId);

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: "failed",
        message: "Invalid token"
      });
    } else {
      console.log("Error from protect route", err);
    }
  }
};

exports.signUp = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.passwordConfirm)
      return next(new AppError(400, "Please provide all the details"));

    if (req.body.password.length < 8)
      return next(new AppError(400, "Password must be of atleast 8 letters"));

    if (!(req.body.password === req.body.passwordConfirm))
      return next(new AppError(400, "Passwords don't match. Try again!"));

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: "success",
      user,
      token
    });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000)
      return next(
        new AppError(
          400,
          "There is already a user with same name. Try again with a different username"
        )
      );
    console.log("Error from authController signup route", err);
  }
};
