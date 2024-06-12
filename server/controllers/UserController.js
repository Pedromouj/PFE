const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Utilisateurs = require("../models/utilisateurs");

class UserController {
  async authenticateController(req, res) {
    try {
      const { username, password } = req.body;

      const user = new Utilisateurs(username, username, password);
      const data = await user.authentification();
      const value = data[0];

      bcrypt.compare(password, value.password, async (bcryptErr, match) => {
        if (bcryptErr) {
          console.error("Error comparing passwords:", bcryptErr);
          res.status(500).json({ error: "Authentication error" });
          return;
        }
        if (password !== value.password) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        //    console.log("match ", matchs , "password" ,password, value.password)
        // Successful authentication
        const token = await jwt.sign(
          { id: value.id, email: value.email, username: value.username },
          "@@/**/@@hgf",
          {
            expiresIn: "1h",
          }
        );
        res.json({
          message: "Login successful",
          user: { id: value.id, email: value.email, username: value.username },
          token: token,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error  in the server" });
    }
  }

  async SincrireController(req, res) {
    try {
      const { username, email, password } = req.body;

      // Input validation
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Utilisateurs(username, email, hashedPassword);
      await user.sincrire();
      res.json({ success: "user inserted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error in the server" });
    }
  }
}

module.exports = new UserController();
