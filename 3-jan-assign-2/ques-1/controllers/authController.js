const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

exports.githubCallback = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    {
      id: user._id,
      githubId: user.githubId
    },
    secret,
    { expiresIn }
  );

  res.json({
    message: "GitHub login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
};
