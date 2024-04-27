import { TaskStateType, ToDoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import {
  addToDoListAC,
  removeToDoListAC,
  toDoListsReducer,
} from "./todolists-reducer";

test("new property with new array should be added when todolist is added", () => {
  const startTasksState: TaskStateType = {};
  const startTodoListState: Array<ToDoListType> = [];
  const action = addToDoListAC("new todo list ");
  const endTodoListState = toDoListsReducer(startTodoListState, action);
  const endTaskState = tasksReducer(startTasksState, action);
  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodoLists).toBe(action.todolistId);
});
test("property with todo list id should be deleted", () => {
  const startTasksState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "HTML", isDone: true },
      { id: "2", title: "CSS", isDone: true },
      { id: "3", title: "JS", isDone: true },
    ],
    toDoListId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "apple", isDone: true },
    ],
  };

  const action = removeToDoListAC("toDoListId2");

  const endTaskState = tasksReducer(startTasksState, action);

  const keys = Object.keys(endTaskState);

  expect(keys.length).toBe(1);
  expect(endTaskState["toDoListId2"]).toBeUndefined();
});
