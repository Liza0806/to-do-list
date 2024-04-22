import { ChangeEvent } from "react";
import { FilterValuseType } from "../../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuseType;
  id: string;
  changeFilter: (value: FilterValuseType, toDoListId: string) => void;
  changeTaskTitle: (id: string, toDoListId: string, title: string) => void;
  changeStatus: (id: string, toDoListId: string) => void;
  addTask: (task: string, toDoListId: string) => void;
  removeTask: (id: string, toDoListId: string) => void;
  removeToDoList: (id: string) => void;
  changeToDoListTitle: (id: string, newTitle: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export const TodoList = (props: PropsType) => {
  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };
  const changeToDoListTitle = (newTitle: string) => {
    props.changeToDoListTitle(props.id, newTitle);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onCange={changeToDoListTitle} />
      </h3>

      <IconButton aria-label="delete" onClick={removeToDoList}>
        <DeleteIcon />
      </IconButton>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const removeHandler = () => {
            props.removeTask(task.id, props.id);
          };
          function onCheckboxChangeHandler(e: ChangeEvent<HTMLInputElement>) {
            props.changeStatus(task.id, props.id);
          }
          function onTaskTitleChangeHandler(titleNewValue: string) {
            props.changeTaskTitle(task.id, props.id, titleNewValue);
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox
                checked={task.isDone}
                onChange={onCheckboxChangeHandler}
              />
              <EditableSpan
                title={task.title}
                onCange={onTaskTitleChangeHandler}
              />
              <IconButton aria-label="delete" onClick={removeHandler}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          color="success"
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={() => props.changeFilter("all", props.id)}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={() => props.changeFilter("active", props.id)}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={() => props.changeFilter("completed", props.id)}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
