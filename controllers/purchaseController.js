const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

exports.purchaseCourse = async (req, res) => {
  const { courseId } = req.body;
  const db = getDB();

  const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
  if (!course) return res.status(404).json({ message: "Course not found" });

  const result = await db.collection("purchases").insertOne({
    userId: req.user._id,
    courseId: course._id,
    amount: course.price,
    date: new Date()
  });

  res.status(201).json(result);
};

exports.getMyPurchases = async (req, res) => {
  const db = getDB();
  const purchases = await db.collection("purchases")
    .aggregate([
      { $match: { userId: req.user._id } },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" }
    ])
    .toArray();
  res.json(purchases);
};
