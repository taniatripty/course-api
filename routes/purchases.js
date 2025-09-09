const express = require('express');
const { purchaseCourse, getMyPurchases } = require('../controllers/purchaseController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post("/", protect, purchaseCourse);
router.get("/my", protect, getMyPurchases);

module.exports = router;
