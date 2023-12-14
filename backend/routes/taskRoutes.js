const express = require("express");
const { protect } = require("../middleware/authMidWare");
const {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/").get(getAllTasks);
router.route("/").post(createTask);
router.get("/:id", getOneTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
