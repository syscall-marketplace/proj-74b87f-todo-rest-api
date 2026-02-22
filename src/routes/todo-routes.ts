import { Express } from 'express';
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } from '../handlers/todo-handlers.js';
import { healthCheck } from '../handlers/health-handler.js';

export function setupTodoRoutes(app: Express): void {
  app.get('/health', healthCheck);

  app.post('/todos', createTodo);
  app.get('/todos', getAllTodos);
  app.get('/todos/:id', getTodoById);
  app.put('/todos/:id', updateTodo);
  app.delete('/todos/:id', deleteTodo);
}
