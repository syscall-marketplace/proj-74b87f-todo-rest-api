import crypto from 'node:crypto';
import { Todo, UpdateTodoRequest } from '../types/todo.js';

class TodoStore {
  private static instance: TodoStore;
  private todos: Map<string, Todo> = new Map();

  private constructor() {}

  static getInstance(): TodoStore {
    if (!TodoStore.instance) {
      TodoStore.instance = new TodoStore();
    }
    return TodoStore.instance;
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  findAll(): Todo[] {
    return Array.from(this.todos.values());
  }

  findById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  update(id: string, updates: UpdateTodoRequest): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) {
      return undefined;
    }
    if (updates.title !== undefined) {
      todo.title = updates.title;
    }
    if (updates.completed !== undefined) {
      todo.completed = updates.completed;
    }
    this.todos.set(id, todo);
    return todo;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }
}

export const todoStore = TodoStore.getInstance();
