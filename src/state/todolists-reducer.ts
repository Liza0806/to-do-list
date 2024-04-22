import { v1 } from "uuid";
import { ToDoListType } from "./../App";

type ActionType = {
  type: string;
  [key: string]: any;
};
export const toDoListReducer = (
  state: Array<ToDoListType>,
  action: ActionType
): Array<ToDoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return [...state.filter((s) => s.id !== action.payload)];
    case "ADD-TODOLIST":
      return [...state, {id: v1(), title: action.payload, filter: 'all'}];
      case 'CHANGE-TODOLIST-TITLE': 
      const toDo= state.find((tl) => tl.id === action.id);
      if(toDo){
        toDo.title = action.title
    } return [...state];
     
    default:
      throw new Error("dont understund u");
  }
};
