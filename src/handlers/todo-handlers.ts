import { Request, Response } from 'express';
import { todoStore } from '../store/todo-store.js';
import { Todo, TodoResponse } from '../types/todo.js';
import { validateCreateTodo, validateUpdateTodo } from '../utils/validation.js';

function toTodoResponse(todo: Todo): TodoResponse {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  };
}

export async function createTodo(req: Request, res: Response): Promise<void> {
  const validation = validateCreateTodo(req.body);
  if (!validation.isValid) {
    res.status(400).json({ error: 'Validation failed', details: validation.errors });
    return;
  }

  const todo = todoStore.create(req.body.title.trim());
  res.status(201).json(toTodoResponse(todo));
}

export async function getAllTodos(req: Request, res: Response): Promise<void> {
  const todos = todoStore.findAll();
  res.status(200).json(todos.map(toTodoResponse));
}

export async function getTodoById(req: Request, res: Response): Promise<void> {
  const todo = todoStore.findById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(200).json(toTodoResponse(todo));
}

export async function updateTodo(req: Request, res: Response): Promise<void> {
  const validation = validateUpdateTodo(req.body);
  if (!validation.isValid) {
    res.status(400).json({ error: 'Validation failed', details: validation.errors });
    return;
  }

  const todo = todoStore.update(req.params.id, req.body);
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(200).json(toTodoResponse(todo));
}

export async function deleteTodo(req: Request, res: Response): Promise<void> {
  const deleted = todoStore.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Todo not found' });
    return;
  }
  res.status(204).send();
}
