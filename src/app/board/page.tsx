'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';

import CreateBoardModal from '@/components/CreateBoardModal';
import ModalLoader from '@/components/ModalLoader';
import { Navbar } from '@/components/Navbar';

import { useToast } from '@/hooks/useToast';
import { initialBoardColumns, transformResponseToColumns } from '@/lib/utils';

import { createTask } from '@/services/boardService';
import { getBoard, updateTask } from '@/services/boardService';

import { APIStates, BoardColumn, BoardStatus, Task, ToastType } from '@/types';
import Toast from '@/components/Toast';
import useAuthentication from '@/hooks/useAuth';

const initialTaskState: Task = {
  id: '',
  title: '',
  content: '',
  status: BoardStatus.TODO
};

const Board = () => {
  const [columns, setColumns] = useState<Record<BoardStatus, BoardColumn>>(initialBoardColumns);
  const [showBoardForm, setShowBoardForm] = useState<boolean>(false);
  const [boardTask, setBoardTask] = useState<Task>(initialTaskState);
  const { addToast, toasts } = useToast();
  const router = useRouter();
  const { token, logout } = useAuthentication();
  const [fetchBoardState, setFetchBoardState] = useState<APIStates>({
    loading: false,
    error: false,
    success: false
  });
  const [newTaskRequest, setNewTaskRequest] = useState<APIStates>({
    loading: false,
    error: false,
    success: false
  });

  const fetchBoard = async () => {
    setFetchBoardState({...fetchBoardState, loading: true});

    try {
      const boardResponse = await getBoard(token);
      const boardByColumns = transformResponseToColumns(boardResponse);

      setColumns(boardByColumns);
      setFetchBoardState({...fetchBoardState, success: true});
    } catch (error) {
      setFetchBoardState({...fetchBoardState, error: true});
      addToast('Error Loading the board, try later...', ToastType.Error);
    }

    setFetchBoardState({...fetchBoardState, loading: false})
  }

  useEffect(() => {
    if (token && !fetchBoardState.success) {
      fetchBoard();
    }
  }, [fetchBoardState.success, token]);

  const addTaskToColumns = (columns: Record<BoardStatus, BoardColumn>, task: Task): void => {
    const { status } = task;
    const newState = { ...columns };
    
    newState[status] = {
      ...newState[status],
      tasks: [...newState[status].tasks, task]
    };
  
    setColumns(newState);
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBoardTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowBoardForm(false);
    setNewTaskRequest({...newTaskRequest, loading: true});

    try {
      const newBoardTask = await createTask(boardTask, token);

      addTaskToColumns(columns, {...newBoardTask, id: String(newBoardTask.id)});
      addToast('Task created successfully', ToastType.Success);
    } catch {
      addToast('Error creating the task', ToastType.Error);
    } finally {
      setBoardTask(initialTaskState);
      setNewTaskRequest({...newTaskRequest, loading: false});
    }
  };

  const onHandleStatusUpdate = async (task: Task, status: BoardStatus) => {
    try {
      await updateTask({...task, status}, token);
      addToast('Task updated successfully', ToastType.Success);
    } catch {
      addToast('Error updating the task, try later...', ToastType.Success);
    }
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return; // No change needed if task is dropped back into the same position

    // TODO: Research the right types

    // @ts-ignore
    const startColumn = columns[source.droppableId];
    // @ts-ignore
    const endColumn = columns[destination.droppableId];

    if (startColumn === endColumn) {
      return; // No change needed if task is moved within the same column
    }

    const startTasks = Array.from(startColumn.tasks);
    const endTasks = Array.from(endColumn.tasks);

        // @ts-ignore

    const task = columns[startColumn.id].tasks.find(task => task.id === draggableId);

    startTasks.splice(source.index, 1);
    endTasks.splice(destination.index, 0, task);

    const newStartColumn = {
      ...startColumn,
      tasks: startTasks
    };

    const newEndColumn = {
      ...endColumn,
      tasks: endTasks
    };

    const newColumns = {
      ...columns,
      [newStartColumn.id]: newStartColumn,
      [newEndColumn.id]: newEndColumn
    };

    onHandleStatusUpdate(task, newEndColumn.id);
    setColumns(newColumns);
  };

  return (
    <div className="flex justify-center w-full mt-20">
      <Navbar handleCreate={() => setShowBoardForm(true)} handleLogout={logout} />
      <CreateBoardModal
        isOpen={showBoardForm}
        handleSubmit={onHandleSubmit}
        handleChange={onHandleChange}
        onClose={() => setShowBoardForm(false)}
        task={boardTask}
      />
      <Toast toasts={toasts} />
      <ModalLoader isVisible={fetchBoardState.loading || newTaskRequest.loading} />
      <DragDropContext onDragEnd={handleDragEnd} >
        <div className="flex justify-center bg-gray-100 min-h-screen mt-50">
          <div className="flex w-screen max-w-6xl p-4">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="flex-1 bg-gray-200 p-4 rounded-lg mr-4">
                <h2 className="text-lg font-semibold mb-4 mt-2">{column.title}</h2>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`rounded-lg p-4 ${column.tasks.length === 0 ? 'bg-transparent' : 'bg-white'}`}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-violet-300 p-2 rounded-lg mb-2"
                            >
                              <div>
                                <h3 className="font-bold">{task.title}</h3>
                                <p>{task.content}</p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
