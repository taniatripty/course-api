const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const db = getDB();

  const existing = await db.collection("users").findOne({ email });
  if (existing) return res.status(400).json({ message: "Email exists" });

  const hashed = await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS);
  const result = await db.collection("users").insertOne({
    name, email, password: hashed, role: role || "user"
  });

  const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, user: { id: result.insertedId, name, email, role: role || "user" } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
};
