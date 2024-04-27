import "./App.css";
import { TaskType, TodoList } from "./components/ToDoList/ToDoList";
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
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { AppRootState } from "./state/store";
import { useSelector } from "react-redux";

export type FilterValuseType = "all" | "completed" | "active";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuseType;
};
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {

const dispatch = useDispatch()
const todoLists = useSelector<AppRootState, Array<ToDoListType>>((state)=> state.todolists)
const tasks = useSelector<AppRootState, TaskStateType>((state)=> state.tasks)

  /// tasks functions

  function addTask(task: string, toDoListId: string) {
    const action = addTaskAC(task, toDoListId);
    dispatch(action);
  }

  function removeTask(id: string, toDoListId: string) {
    const action = removeTaskAC(id, toDoListId);
    dispatch(action);
  }

  function changeStatus(isDone: boolean, toDoListId: string, id: string) {
    const action = changeTaskStatusAC(!isDone, toDoListId, id);
    dispatch(action);
  }
  function changeTaskTitle(id: string, toDoListId: string, title: string) {
    const action = changeTaskTitleAC(title, toDoListId, id);
    dispatch(action);
  }

  /// todo functions

  function AddToDoList(title: string) {
    const action = addToDoListAC(title);
    dispatch(action);
   
  }
  const removeToDoList = (toDoListId: string) => {
    const action = removeToDoListAC(toDoListId);
    dispatch(action);

  };
  const changeToDoListTitle = (id: string, newTitle: string) => {
    const action = changeToDoListTitleAC(id, newTitle);
    dispatch(action);
  };

  function changeFilter(value: FilterValuseType, toDoListId: string) {
    const action = changeToDoListFilterAC(toDoListId, value);
    dispatch(action);
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
          {todoLists.map((tl) => {
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

export default AppWithRedux;
