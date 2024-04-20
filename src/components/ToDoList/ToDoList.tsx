import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuseType } from "../../App";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, toDoListId: string) => void;
  changeFilter: (value: FilterValuseType, toDoListId: string) => void;
  addTask: (task: string, toDoListId: string) => void;
  changeStatus: (id: string, toDoListId: string) => void;
  filter: FilterValuseType;
  id: string;
  removeToDoList: (id: string) => void
};

export type AllTaskType = {
  [key: string]: Array<TaskType>;
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export const TodoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setNewTaskTitle(event.target.value);
  }

  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const trimmedTaskTitle = newTaskTitle.trim();
      trimmedTaskTitle
        ? props.addTask(trimmedTaskTitle, props.id)
        : setError("no text");
      setNewTaskTitle("");
    }
  }

  function addTask() {
    const trimmedTaskTitle = newTaskTitle.trim();
    if (trimmedTaskTitle) {
      props.addTask(trimmedTaskTitle, props.id);
    } else {
      console.log("addTask");
      setError("no text");
      return;
    }
    setNewTaskTitle("");
  }
const removeToDoList = () => {
  props.removeToDoList(props.id)
}
  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={removeToDoList}>x</button>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        {<div className="error-message">{error}</div>}
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const removeHandler = () => {
            props.removeTask(task.id, props.id);
          };
          function onCheckboxChangeHandler(e: ChangeEvent<HTMLInputElement>) {
            props.changeStatus(task.id, props.id);
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={onCheckboxChangeHandler}
              />
              <span>{task.title}</span>
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
