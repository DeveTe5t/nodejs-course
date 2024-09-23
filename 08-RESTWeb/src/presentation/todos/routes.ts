import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {

    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        // router.get('/api/todos', (req, res) => todoController.getTodos(req, res));
        // similar but not necesary because is parametes in the same order
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);

        return router;
    }
}