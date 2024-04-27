import React, { useReducer } from "react";
import "./App.css";
import { TaskType, TodoList } from "./components/ToDoList/ToDoList";
import { v1 } from "uuid";
import { AddItemForm } from "./components/ToDoList/AddItemForm";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  addToDoListAC,
  changeToDoListFilterAC,
  changeToDoListTitleAC,
  removeToDoListAC,
  toDoListsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

export type FilterValuseType = "all" | "completed" | "active";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuseType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};
function AppWithReducers() {
  const toDoListId1 = v1();
  const toDoListId2 = v1();

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
  });

  let [toDoLists, dispatchToToDoListsReducer] = useReducer(toDoListsReducer, [
    { id: toDoListId1, title: "What to learn", filter: "active" },
    { id: toDoListId2, title: "What to buy", filter: "completed" },
  ]);

  /// tasks functions

  function addTask(task: string, toDoListId: string) {
    const action = addTaskAC(task, toDoListId);
    dispatchToTasksReducer(action);
  }

  function removeTask(id: string, toDoListId: string) {
    const action = removeTaskAC(id, toDoListId);
    dispatchToTasksReducer(action);
  }

  function changeStatus(isDone: boolean, toDoListId: string, id: string) {
    const action = changeTaskStatusAC(!isDone, toDoListId, id);
    dispatchToTasksReducer(action);
  }
  function changeTaskTitle(id: string, toDoListId: string, title: string) {
    const action = changeTaskTitleAC(title, toDoListId, id);
    dispatchToTasksReducer(action);
  }

  /// todo functions

  function AddToDoList(title: string) {
    const action = addToDoListAC(title);
    dispatchToToDoListsReducer(action);
    dispatchToTasksReducer(action);
  }
  const removeToDoList = (toDoListId: string) => {
    const action = removeToDoListAC(toDoListId);
    dispatchToToDoListsReducer(action);
    dispatchToTasksReducer(action);
  };
  const changeToDoListTitle = (id: string, newTitle: string) => {
    const action = changeToDoListTitleAC(id, newTitle);
    dispatchToToDoListsReducer(action);
  };

  function changeFilter(value: FilterValuseType, toDoListId: string) {
    const action = changeToDoListFilterAC(toDoListId, value);
    dispatchToToDoListsReducer(action);
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>{" "}
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={AddToDoList} />
        </Grid>
        <Grid container spacing={3}>
          {toDoLists.map((tl) => {
            let tasksForToDoList = tasks[tl.id];

            if (tl.filter === "completed") {
              tasksForToDoList = tasksForToDoList.filter((task) => task.isDone);
            }
            if (tl.filter === "active") {
              tasksForToDoList = tasksForToDoList.filter(
                (task) => !task.isDone
              );
            }
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <TodoList
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    id={tl.id}
                    removeToDoList={removeToDoList}
                    changeTaskTitle={changeTaskTitle}
                    changeToDoListTitle={changeToDoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
