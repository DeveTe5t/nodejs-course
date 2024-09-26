import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy bread', completedAt: null },
//     { id: 3, text: 'Buy butter', completedAt: new Date() },
// ];

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        // return res.json(todos);
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        // const todo = todos.find(todo => todo.id === id);

        // if not found not return
        // const todo = await prisma.todo.findUnique({ where: { id } });
        const todo = await prisma.todo.findFirst({ where: { id } });
        // if not found return empty array []
        // const todo = await prisma.todo.findMany({ where: { id } });

        // with todo not return
        (todo)
            // with todo return []
            // (todo.length > 0)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    public createTodo = async (req: Request, res: Response) => {
        // const { text } = req.body;
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });
        // if (!text) return res.status(400).json({ error: 'Text property is required' });

        const todo = await prisma.todo.create({
            // data: { text }
            data: createTodoDto!
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     completedAt: new Date(),
        // }

        // todos.push(newTodo);

        // res.json(newTodo);
        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        // if (isNaN(id)) return res.status(400).json({ error: 'ID argumnt is not a number' });
        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) return res.status(404).json({ error: `TODO with id ${id} not found` });

        // const { text, completedAt } = req.body;
        // if (!text) return res.status(400).json({ error: 'Text property is required' });

        // todo.text = text || todo.text;
        const updatedTodo = await prisma.todo.update({
            where: { id },
            // data: {
            //     text: text || todo.text,
            //     completedAt: (completedAt) ? new Date(completedAt) : null,
            // }
            data: updateTodoDto!.values
        });

        // (completedAt === null)
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date(completedAt || todo.completedAt);

        // // ! it's pass by reference, so we don't need to update the array
        // // todos.forEach((todo, index) => {
        // //     if (todo.id === id) {
        // //         todos[index] = todo;
        // //     }
        // // });

        // res.json(todo);
        res.json(updatedTodo);
    }

    public deteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) return res.status(404).json({ error: `TODO with id ${id} not found` });

        // todos.splice(todos.indexOf(todo), 1);
        // todos.splice(id - 1, 1);
        const deletedTodo = await prisma.todo.delete({ where: { id } });

        // res.json(todo);
        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(400).json({ error: `TODO with id ${id} not found` });
    }
}