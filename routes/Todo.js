const express = require("express");
const { mongo } = require("mongoose");
const router = express.Router();

const {
    getAllTodos,
    createTodo,
    getTodoById,
    getTodo,
    updateTodo,
    deleteTodo,
    home,
    create,
    edit,
    update,
} = require("../controllers/Todo");

router.get("/", home);

router.get("/todos/create", create);

router.get("/todos/:id/edit", edit);

router.put("/todos/update", update);

// apis
router.get("/todos/", getAllTodos);

router.post("/todo/create", createTodo);

router.param("todoId", getTodoById);

router.get("/todo/:todoId", getTodo);

router.put("/todo/:todoId/update", updateTodo);

router.delete("/todo/:todoId/delete", deleteTodo);

module.exports = router;