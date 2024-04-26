import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { TaskType } from "../components/ToDoList/ToDoList";

export type Action1 = {
  type: "1";
  payload: string;
};
export type Action2 = {
  type: "2";
  payload: string;
};
type ActionsType =
  | Action1
  | Action2
  export const toDoListReducer = (
    state: Array<TaskStateType>,
    action: ActionsType
  ): Array<TaskType> => {
    switch (action.type) {
      case "1":
        return '1'
  
      case "2":
        return '2'
  
      
      default:
        throw new Error("dont understund u");
    }
  };
  export const Action1AC = (id: string): Action1 => {
    return { type: "1", payload: id };
  };
  
  export const Action2AC = (title: string): Action2 => {
    return { type: "2", payload: title };
  };