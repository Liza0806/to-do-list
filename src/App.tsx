import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./components/ToDoList/ToDoList";
import { v1 } from "uuid";
export type FilterValuseType = "all" | "completed" | "active";

function App() {
  let tasks1 = [
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
  ];
  let [tasks, setTasks] = useState<Array<TaskType>>(tasks1);
  let [filter, setFilter] = useState<FilterValuseType>("all");

  function changeFilter(value: FilterValuseType) {
    setFilter(value);
  }
  function addTask(task: string) {
    let newTask = { id: v1(), title: task, isDone: false };
    setTasks([...tasks, newTask]);
  }
  let tasksForToDoList = tasks;

  if (filter === "completed") {
    tasksForToDoList = tasks.filter((task) => task.isDone);
  }
  if (filter === "active") {
    tasksForToDoList = tasks.filter((task) => !task.isDone);
  }
  function removeTask(id: string) {
    let filteredTasks = tasks1.filter((i) => i.id !== id);
    setTasks(filteredTasks);
  }

  function changeStatus(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.isDone = !task.isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForToDoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
