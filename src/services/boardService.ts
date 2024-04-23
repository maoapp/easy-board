import { Task } from '@/types';
import { get, post, put, API_BASE_URL  } from '@/lib/api';

// TODO: Improve the way to share the token between services with tools like redux, context
export const getBoard = async (token: string): Promise<Array<Task>> => {
  try {
    const response = await get<Array<Task>>(
      `${API_BASE_URL}/board`,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );

    return response;

  } catch (error: any) {
    console.error('Get board failed:', error.response.data);
    throw new Error('Failed to fetch board data'); // Throw an error
  }
}

export const createTask = async (task: Task, token: string): Promise<Task> => {
  try {
    const response = await post<Task>(
      `${API_BASE_URL}/board`,
      task,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );

    return response; 
  } catch (error: any) {
    console.error('Create task failed:', error.response);
    throw new Error('Failed to create task'); // Throw an error
  }
};

export const updateTask = async (updatedTask: Task, token: string): Promise<Task> => {
  try {
    const response = await put<Task>(
      `${API_BASE_URL}/board/${updatedTask.id}`,
      updatedTask,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );

    return response;

  } catch (error: any) {
    console.error('Update task failed:', error.response);
    throw new Error('Failed to update task'); // Throw an error
  }
};
