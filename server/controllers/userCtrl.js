const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const userCtrl = {
    register: async (req, res) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ msg: "Request body is empty or undefined" });
            }

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email Already Registered" });
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters" });
            }
            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new Users({
               name,
               email,
               password: passwordHash
            });

            //Save MongoDB
            await newUser.save()


            res.status(200).json({ msg: "User registered here" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userCtrl;



