const Todo = require("../models/Todo");

exports.createTodo = (req, res) => {
    const todo = new Todo(req.body);

    todo.save((err, task) => {
        if (err || !task) {
            return res.status(400).json({ error: "something went wrong" });
        }
        res.json({ task });
    });
};

exports.getAllTodos = (req, res) => {
    Todo.find()
        .sort("createdAt")
        .exec((err, todos) => {
            if (err || !todos) {
                return res
                    .status(400)
                    .json({ error: "something went wrong in finding all todos" });
            }
            res.json(todos);
        });
};

exports.getTodoById = (req, res, next, todoId) => {
    Todo.findById(todoId).exec((err, todo) => {
        if (err || !todo) {
            return res.status(400).json({ error: "404 todo not found" });
        }

        req.todo = todo;
        next();
    });
};

exports.getTodo = (req, res) => {
    return res.json(req.todo);
};

exports.updateTodo = (req, res) => {
    const todo = req.todo;

    todo.task = req.body.task;

    todo.save((err, task) => {
        if (err || !task) {
            return res
                .status(400)
                .json({ error: "something went wrong while updating" });
        }
        res.json({ task });
    });
};

exports.deleteTodo = (req, res) => {
    const todo = req.todo;

    todo.remove((err, task) => {
        if (err || !task) {
            return res
                .status(400)
                .json({ error: "something went wrong while deteting the todo" });
        }
        res.json({
            task_deleted: task,
            message: "Todo deleted successfully!",
        });
    });
};

exports.home = async (req, res) => {
    const todos = await Todo.find().sort("createdAt").exec()

    res.render('index', {todos: todos})
};

exports.create = (req, res) => {
    res.render('create')
};

exports.edit = async (req, res) => {
    const todo = await Todo.findById(req.params.id).exec()

    res.render('edit', {todo: todo})
};

exports.update = async (req, res) => {
    const todo = await Todo.findById(req.body.id).exec()
    todo.task = req.body.task

    try {
        await todo.save()
        res.json({ todo });
    } catch (e) {
        return res
            .status(400)
            .json({ error: e });
    }
};