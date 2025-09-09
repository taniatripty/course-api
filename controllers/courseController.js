const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');


exports.createCourse = async (req, res) => {
  const db = getDB();
  const result = await db.collection("courses").insertOne(req.body);
  res.status(201).json(result);
};

exports.getCourses = async (req, res) => {
  const db = getDB();
  const courses = await db.collection("courses").find().toArray();
  res.json(courses);
};

exports.getCourse = async (req, res) => {
  const db = getDB();
  const course = await db.collection("courses").findOne({ _id: new ObjectId(req.params.id) });
  if (!course) return res.status(404).json({ message: "Not found" });
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  const db = getDB();
  await db.collection("courses").deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Deleted" });
};
