const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createSingleTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");

// task をすべて取得
router.get("/", getAllTasks);
// task を作成
router.post("/", createSingleTask);
// 決められた task を取得
router.get("/:id", getSingleTask);
// 決められた task を更新
router.patch("/:id", updateTask);
// 決められた task を削除
router.delete("/:id", deleteTask);

module.exports = router;