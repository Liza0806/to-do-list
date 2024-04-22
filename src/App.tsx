import React, { useState } from "react";
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

export type FilterValuseType = "all" | "completed" | "active";

function App() {
  const toDoListId1 = v1();
  const toDoListId2 = v1();

  type AllTaskType = {
    [key: string]: Array<TaskType>;
  };
  let [tasks, setTasks] = useState<AllTaskType>({
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

  /// tasks functions

  function addTask(task: string, toDoListId: string) {
    let oneTaskObj = { id: v1(), title: task, isDone: false };
    let taskPart = tasks[toDoListId];
    let newTasks = [oneTaskObj, ...taskPart];
    tasks[toDoListId] = newTasks;

    setTasks({ ...tasks });
  }

  function removeTask(id: string, toDoListId: string) {
    const taskPart = tasks[toDoListId];
    let filteredTasks = taskPart.filter((i) => i.id !== id);
    tasks[toDoListId] = filteredTasks;
    setTasks({ ...tasks });
  }

  function changeStatus(id: string, toDoListId: string) {
    const taskPart = tasks[toDoListId];
    const task = taskPart.find((task) => task.id === id);
    if (task) {
      task.isDone = !task.isDone;
    }
    setTasks({ ...tasks });
  }
  function changeTaskTitle(id: string, toDoListId: string, title: string) {
    console.log(title, "title");
    const taskPart = tasks[toDoListId];
    const task = taskPart.find((task) => task.id === id);
    if (task) {
      task.title = title;
    }
    setTasks({ ...tasks });
  }

/// todo functions

  function AddToDoList(title: string) {
    let newToDoList: ToDoListType = { id: v1(), title: title, filter: "all" };
    setToDoLists([...toDoLists, newToDoList]);
    setTasks({
      ...tasks,
      [newToDoList.id]: [],
    });
  }
  const removeToDoList = (toDoListId: string) => {
    let filteredToDoLists = toDoLists.filter((tl) => tl.id !== toDoListId);
    setToDoLists(filteredToDoLists);
    delete tasks[toDoListId];
    setTasks({ ...tasks });
  };
  const changeToDoListTitle = (id: string, newTitle: string) => {
    let filteredToDoList = toDoLists.find((tl) => tl.id === id);
    if (filteredToDoList) {
      filteredToDoList.title = newTitle;
      setToDoLists([...toDoLists]);
    }
  };
  
  function changeFilter(value: FilterValuseType, toDoListId: string) {
    let toDoList = toDoLists.find((tl) => tl.id === toDoListId);
    if (toDoList) {
      const updatedToDoLists = toDoLists.map((tl) => {
        if (tl.id === toDoListId) {
          return { ...tl, filter: value };
        }
        return tl;
      });
      setToDoLists(updatedToDoLists);
    }
  }


  type ToDoListType = {
    id: string;
    title: string;
    filter: FilterValuseType;
  };

  let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
    { id: toDoListId1, title: "What to learn", filter: "active" },
    { id: toDoListId2, title: "What to buy", filter: "completed" },
  ]);

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
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={AddToDoList} />
        </Grid>
        <Grid container spacing={3} >
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
              <Grid item >
                <Paper elevation={3} style={{padding: '20px'}}>
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

export default App;
