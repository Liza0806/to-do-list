import { ChangeEvent } from "react";
import { FilterValuseType } from "../../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
      <button onClick={removeToDoList}>x</button>
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
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onCheckboxChangeHandler}
              />
              <EditableSpan
                title={task.title}
                onCange={onTaskTitleChangeHandler}
              />
              <button onClick={removeHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => props.changeFilter("all", props.id)}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => props.changeFilter("active", props.id)}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => props.changeFilter("completed", props.id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
