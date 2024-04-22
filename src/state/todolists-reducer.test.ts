import { v1 } from "uuid";
import { toDoListReducer } from "./todolists-reducer";
import { ToDoListType } from "../App";

test('correct todolist should be remove',
    ()=> {
        const toDoListId1 = v1();
        const toDoListId2 = v1();

        const startState: Array<ToDoListType> = [
            { id: toDoListId1, title: "What to learn", filter: "active" },
            { id: toDoListId2, title: "What to buy", filter: "completed" },
          ];    
          const endState = toDoListReducer(startState, {type: 'REMOVE-TODOLIST', payload: toDoListId1} )
          expect(endState.length).toBe(1)
          expect(endState[0].id).toBe(toDoListId2)
    }

)
test('correct todolist should be added',
    ()=> {
        const toDoListId1 = v1();
        const toDoListId2 = v1();

        const startState: Array<ToDoListType> = [
            { id: toDoListId1, title: "What to learn", filter: "active" },
            { id: toDoListId2, title: "What to buy", filter: "completed" },
          ];    
          const newTodoTitle = "Whats going on"
          const endState = toDoListReducer(startState, {type: 'ADD-TODOLIST', payload: newTodoTitle} )
          expect(endState.length).toBe(3)
          expect(endState[2].title).toBe(newTodoTitle)
          expect(endState[2].filter).toBe("all")
    }

)
test('correct todolist title should be changed',
    ()=> {
        const toDoListId1 = v1();
        const toDoListId2 = v1();
        

        const startState: Array<ToDoListType> = [
            { id: toDoListId1, title: "What to learn", filter: "active" },
            { id: toDoListId2, title: "What to buy", filter: "completed" },
          ];    
        
          const action = {
            type: 'CHANGE-TODOLIST-TITLE',
            title: "Whats going on",
            id: toDoListId1,
            filter: "active"
          }
          const endState = toDoListReducer(startState, action )
      
          expect(endState[0].title).toBe("Whats going on")
          expect(endState[1].title).toBe("What to buy")

    }

)
test('correct todolist filter should be changed',
    ()=> {
        const toDoListId1 = v1();
        const toDoListId2 = v1();
        

        const startState: Array<ToDoListType> = [
            { id: toDoListId1, title: "What to learn", filter: "active" },
            { id: toDoListId2, title: "What to buy", filter: "completed" },
          ];    
        
          const action = {
            type: 'CHANGE-TODOLIST-FILRER',
            title: "Whats going on",
            id: toDoListId1,
            filter: "completed"
          }
          const endState = toDoListReducer(startState, action )
      
          expect(endState[0].filter).toBe("completed")
          expect(endState[1].filter).toBe("completed")

    }

)