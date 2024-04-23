import { BoardColumn, BoardResponse, BoardStatus } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialBoardColumns: Record<BoardStatus, BoardColumn> = {
  TODO: {
    id: 'TODO',
    title: 'To Do',
    tasks: []
  },
  IN_PROGRESS: {
    id: 'IN_PROGRESS',
    title: 'In Progress',
    tasks: []
  },
  COMPLETED: {
    id: 'COMPLETED',
    title: 'Completed',
    tasks: []
  },
  REVIEW: {
    id: 'REVIEW',
    title: 'Review',
    tasks: []
  },
  BLOCKED: {
    id: 'BLOCKED',
    title: 'Blocked',
    tasks: []
  }
};

export const transformResponseToColumns = (response: BoardResponse): Record<BoardStatus, BoardColumn> => {
  response.forEach(task => {
    const status = task.status;
    initialBoardColumns[status].tasks.push({
      id: task.id.toString(),
      title: task.title,
      content: task.content,
      status: task.status
    });
  });

  return initialBoardColumns;
}

export const isEmptyObject = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

