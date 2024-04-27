import { v1 } from "uuid";
import { FilterValuseType, ToDoListType } from "./../App";

export type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  payload: string;
  todolistId: string;
};
export type ChangeToDoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeToDoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILRER";
  id: string;
  filter: FilterValuseType;
};

type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType;

 export const toDoListId1 = v1();
 export const toDoListId2 = v1();

const initialState:  Array<ToDoListType> = [
  { id: toDoListId1, title: "What to learn", filter: "active" },
  { id: toDoListId2, title: "What to buy", filter: "completed" },
]

export const toDoListsReducer = (
  state: Array<ToDoListType> = initialState,
  action: ActionsType
): Array<ToDoListType> => {
  
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return [...state.filter((s) => s.id !== action.id)];

    case "ADD-TODOLIST":
      return [
        ...state,
        { id: action.todolistId, title: action.payload, filter: "all" },
      ];

    case "CHANGE-TODOLIST-TITLE":
      const toDo = state.find((tl) => tl.id === action.id);
      if (toDo) {
        toDo.title = action.title;
      }
      return [...state];

    case "CHANGE-TODOLIST-FILRER":
      const toDoFiltered = state.find((tl) => tl.id === action.id);
      if (toDoFiltered) {
        toDoFiltered.filter = action.filter;
      }
      return [...state];
    default:
      return state
  }
};

/// AC

export const removeToDoListAC = (id: string): RemoveToDoListActionType => {
  return { type: "REMOVE-TODOLIST", id: id };
};

export const addToDoListAC = (title: string): AddToDoListActionType => {
  return { type: "ADD-TODOLIST", payload: title, todolistId: v1() };
};

export const changeToDoListTitleAC = (
  id: string,
  title: string
): ChangeToDoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    title: "Whats going on",
    id: id,
  };
};
export const changeToDoListFilterAC = (
  id: string,
  filter: FilterValuseType
): ChangeToDoListFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILRER",
    filter: filter,
    id: id,
  };
};
