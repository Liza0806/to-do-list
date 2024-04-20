import React, { useState } from "react";
import "./App.css";
import { AllTaskType, TodoList } from "./components/ToDoList/ToDoList";
import { v1 } from "uuid";
export type FilterValuseType = "all" | "completed" | "active";

function App() {
  const toDoListId1 = v1();
  const toDoListId2 = v1();

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
  function addTask(task: string, toDoListId: string) {
    debugger
    let oneTaskObj = { id: v1(), title: task, isDone: false };
    let taskPart = tasks[toDoListId];
    let newTasks = [oneTaskObj, ...taskPart];
    tasks[toDoListId] = newTasks;

    setTasks({...tasks});
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
let removeToDoList = (toDoListId: string) => {
let filteredToDoLists = toDoLists.filter(tl=> tl.id !== toDoListId)
setToDoLists(filteredToDoLists);
delete tasks[toDoListId]
setTasks({...tasks})
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
      {toDoLists.map((tl) => {
        let tasksForToDoList = tasks[tl.id];

        if (tl.filter === "completed") {
          tasksForToDoList = tasksForToDoList.filter((task) => task.isDone);
        }
        if (tl.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone);
        }
        return (
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
          />
        );
      })}
    </div>
  );
}

export default App;
