const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = async (req, res) => {};

router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(200).json({ data: others, msg: "Registration Successful!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to send email
router.post("/email", async (req, res) => {
  try {
    const msg = {
      to: `${req.body.email}`, // Change to your recipient
      from: "johnmayer190999@gmail.com", // Change to your verified sender
      subject: `Welcome to  Our Company!!!`,
      text: `Thanks ${req.body.username},for registering for our services we look to provide even better services at a lower cost in the future.`,
    };
    const response = await sgMail.send(msg);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
