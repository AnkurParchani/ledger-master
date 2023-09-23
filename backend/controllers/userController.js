const User = require("../models/userModel");
const AppError = require("../utils/appError");

// GETTING SPECIFIC USER
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next(new AppError(404, "No user found"));

    res.status(200).json({
      status: "success",
      user
    });
  } catch (err) {
    console.log(`Error from User controller - getUser ${err}`);
  }
};

// UPDATING THE USER
exports.updateMe = async (req, res, next) => {
  if (!req.body.username && !req.body.password)
    return next(
      new AppError(
        400,
        "Please provide minimum of one of the following details"
      )
    );

  if (
    req.body.username &&
    (await User.findOne({ username: req.body.username }))
  )
    return next(
      new AppError(400, "There is already a user with same username")
    );

  const user = await User.findOne({ _id: req.user._id });

  if (!user) return next(new AppError(404, "No user found"));

  await user.updateOne(req.body);

  res.status(200).json({
    status: "success",
    message: "User updated successfully"
  });
};

// DELETING THE USER
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next(new AppError(404, "No user found"));

    if (!req.body.username || !req.body.password)
      return next(new AppError(401, "Please provide username and password"));

    if (
      req.body.username === user.username &&
      req.body.password === user.password
    ) {
      await User.deleteOne({ _id: req.user._id });

      res.status(200).json({
        status: "success",
        deletedUser: user
      });
    } else {
      return next(new AppError(401, "Incorrect username or password"));
    }
  } catch (err) {
    console.log("Error from deleteUser userController", err);
  }
};
