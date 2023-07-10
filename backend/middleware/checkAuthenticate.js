const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const checkAuthenticate = async (req, res, next) => {
  try {
    const token = await req.cookies.loginToken;
    const checkToken = jwt.verify(token, process.env.SECRET_KEY);
    const checkUser = await User.findOne({
      _id: checkToken._id,
      "tokens.token": token,
    });

    if (!checkUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.checkUser = checkUser;
    req.userId = checkUser._id;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized : Login to see this Page");
    console.log(error);
  }
};

module.exports = checkAuthenticate;
