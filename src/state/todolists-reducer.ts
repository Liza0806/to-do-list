import { v1 } from "uuid";
import { FilterValuseType, ToDoListType } from "./../App";

export type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  payload: string;
};
export type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  payload: string;
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

export const toDoListReducer = (
  state: Array<ToDoListType>,
  action: ActionsType
): Array<ToDoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return [...state.filter((s) => s.id !== action.payload)];

    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.payload, filter: "all" }];

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
      throw new Error("dont understund u");
  }
};

/// AC

export const removeToDoListAC = (id: string): RemoveToDoListActionType => {
  return { type: "REMOVE-TODOLIST", payload: id };
};

export const addToDoListAC = (title: string): AddToDoListActionType => {
  return { type: "ADD-TODOLIST", payload: title };
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
  filter: string
): ChangeToDoListFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILRER",
    filter: "all",
    id: id,
  };
};
