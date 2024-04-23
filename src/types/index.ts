
export enum BoardStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
  REVIEW = 'REVIEW'
}

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export interface ToastMessage {
  message: string;
  type: ToastType;
  id: number;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface Task {
  id: string;
  title: string;
  content: string;
  status: BoardStatus;
}

export interface BoardColumn {
  id: string,
  title: string,
  tasks: Array<Task>
}

export type BoardResponse = Array<Task>

export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpResponse {
  user: User;
  token: string;
}

export interface APIStates {
  loading: boolean;
  error: boolean;
  success: boolean
}

