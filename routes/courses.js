const express = require('express');


const { getCourses, getCourse, createCourse, deleteCourse } = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", protect, admin, createCourse);
router.delete("/:id", protect, admin, deleteCourse);

module.exports = router;
