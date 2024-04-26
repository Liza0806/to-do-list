import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { TaskType } from "../components/ToDoList/ToDoList";

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
type ActionsType = RemoveTaskActionType | AddTaskActionType;
export const tasksReducer = (
  state: TaskStateType,
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

    default:
      throw new Error("dont understund u");
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
