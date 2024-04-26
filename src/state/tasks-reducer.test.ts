import { addTaskAC, changeTaskTitleAC, changeTaskStatusAC,removeTaskAC, tasksReducer } from "./tasks-reducer";
import { TaskStateType } from "../App";

test("correct task should be deleted from correct array", () => {
  let startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "HTML", isDone: true },
      { id: "2", title: "CSS", isDone: true },
      { id: "3", title: "JS", isDone: true },
    ],
    toDoListId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "apple", isDone: true },
    ],
  };

  const action = removeTaskAC("2", "toDoListId2");

  const endState = tasksReducer(startState, action);

  expect(endState["toDoListId1"].length).toBe(3);
  expect(endState["toDoListId2"].length).toBe(2);
  expect(endState["toDoListId2"].every((t: any) => t.id !== 2)).toBeTruthy();
});


test("correct task should be added in correct array", () => {
  let startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "HTML", isDone: true },
      { id: "2", title: "CSS", isDone: true },
      { id: "3", title: "JS", isDone: true },
    ],
    toDoListId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "apple", isDone: true },
    ],
  };

  const action = addTaskAC("newTitle", "toDoListId1");

  const endState = tasksReducer(startState, action);

  expect(endState["toDoListId1"].length).toBe(4);
  expect(endState["toDoListId2"].length).toBe(3);
  expect(endState["toDoListId1"][0].title).toBe("newTitle");
  expect(endState["toDoListId1"][0].id).toBeDefined();
  expect(endState["toDoListId1"][0].isDone).toBe(false);
});
test("correct task title should be updated in correct array", () => {
  let startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "HTML", isDone: true },
      { id: "2", title: "CSS", isDone: true },
      { id: "3", title: "JS", isDone: true },
    ],
    toDoListId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "apple", isDone: true },
    ],
  };

  const action = changeTaskTitleAC("newTitle", "toDoListId2", "2");

  const endState = tasksReducer(startState, action);

  expect(endState["toDoListId1"].length).toBe(3);
  expect(endState["toDoListId2"][1].title).toBe("newTitle");
  expect(endState["toDoListId1"][1].title).toBe("CSS");
});
test("correct task status should be updated in correct array", () => {
  let startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "HTML", isDone: true },
      { id: "2", title: "CSS", isDone: true },
      { id: "3", title: "JS", isDone: true },
    ],
    toDoListId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "apple", isDone: true },
    ],
  };

  const action = changeTaskStatusAC(false, "toDoListId2", "2");

  const endState = tasksReducer(startState, action);

  expect(endState["toDoListId1"].length).toBe(3);
  expect(endState["toDoListId2"][1].isDone).toBe(false);
  expect(endState["toDoListId1"][1].isDone).toBe(true);
});
