import express, { Express } from 'express';
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } from '../handlers/todo-handlers.js';

export function setupTodoRoutes(app: Express): void {
  app.use(express.json());

  app.post('/todos', createTodo);
  app.get('/todos', getAllTodos);
  app.get('/todos/:id', getTodoById);
  app.put('/todos/:id', updateTodo);
  app.delete('/todos/:id', deleteTodo);
}
