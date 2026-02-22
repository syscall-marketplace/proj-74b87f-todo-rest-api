export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO string for JSON serialization
}

export interface ErrorResponse {
  error: string;
  details?: string[];
}