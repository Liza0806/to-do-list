import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { AddToDoListActionType, RemoveToDoListActionType, toDoListId1, toDoListId2 } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todoId: string;
};
export type AddTaskActionType = {
  type: "ADD-TASK";
  taskTitle: string;
  todoId: string;
};
export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskTitle: string;
  todoId: string;
  taskId: string;
};
export type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS";
    isDone: boolean;
    todoId: string;
    taskId: string;
}

const initialState: TaskStateType = {
  [toDoListId1]: [
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
  ],
  [toDoListId2]: [
    { id: v1(), title: "book", isDone: true },
    { id: v1(), title: "milk", isDone: true },
    { id: v1(), title: "apple", isDone: true },
  ],
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | changeTaskStatusActionType
  | AddToDoListActionType
  | RemoveToDoListActionType;
export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsType
): TaskStateType => {

  switch (action.type) {
    case "REMOVE-TASK": {
      let stateCopy = { ...state };
      let tasks = state[action.todoId];
      const filteredTask = tasks.filter((t: any) => t.id !== action.taskId);
      stateCopy[action.todoId] = filteredTask;

      return stateCopy;
    }

    case "ADD-TASK": {
      let stateCopy = { ...state };
      let tasks = state[action.todoId];
      const taskItem = { id: v1(), title: action.taskTitle, isDone: false };
      tasks = [taskItem, ...tasks];
      stateCopy[action.todoId] = tasks;
      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      let stateCopy = { ...state };
      let tasks = state[action.todoId];
      let task = tasks.find((t: any)=> t.id === action.taskId)
      if(task){
      task.title = action.taskTitle}
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
        let stateCopy = { ...state };
        let tasks = state[action.todoId];
        let task = tasks.find((t: any)=> t.id === action.taskId)
        if(task){
        task.isDone = action.isDone}
        return stateCopy;
      }

    case "ADD-TODOLIST": {
        let stateCopy = { ...state };
        stateCopy[action.todolistId] = []
        return stateCopy;
    }
    case "REMOVE-TODOLIST":{
      let stateCopy = { ...state };
      delete stateCopy[action.id]
      return stateCopy;
    }
    default:
      return state
  }
};
export const removeTaskAC = (
  taskId: string,
  todoId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todoId: todoId };
};

export const addTaskAC = (
  taskTitle: string,
  todoId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", taskTitle: taskTitle, todoId: todoId };
};

export const changeTaskTitleAC = (
  taskTitle: string,
  todoId: string,
  taskId: string
) : ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskTitle: taskTitle,
    todoId: todoId,
    taskId: taskId,
  };
};

export const changeTaskStatusAC = (  isDone: boolean,
    todoId: string,
    taskId: string): changeTaskStatusActionType => {
        return {
            type: "CHANGE-TASK-STATUS",
            isDone: isDone,
            todoId: todoId,
            taskId: taskId,
          };
    }