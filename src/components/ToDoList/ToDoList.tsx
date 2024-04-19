import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuseType } from "../../App";

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuseType) => void;
  addTask: (task: string) => void;
  changeStatus: (id: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export const TodoList = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  }
  function addTask() {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const removeHandler = () => {
            props.removeTask(task.id);
          };
          function onCheckboxChangeHandler(e: ChangeEvent<HTMLInputElement>) {
            props.changeStatus(task.id);
          }
          return (
            <li key={task.id}>
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
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
