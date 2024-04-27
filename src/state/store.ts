import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { toDoListsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
  todolists: toDoListsReducer,
  tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);
