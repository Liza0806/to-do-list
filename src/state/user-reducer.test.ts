import { userReducer } from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: "Bob" };
    const endState = userReducer(startState, { type: 'INCREMENT-AGE' });
    
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});


test('user reducer should increment only childern count', () => {
    const startState = { age: 20, childrenCount: 2, name: "Bob" };
    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' });
    
    expect(endState.childrenCount).toBe(3);
    expect(endState.age).toBe(20);
});
test('user reducer should increment only name', () => {
    const startState = { age: 20, childrenCount: 2, name: "Bob" };
    const newName = 'Bill'
    const endState = userReducer(startState, { type: 'CHANGE-NAME', payload: newName });
    
    expect(endState.name).toBe(newName);
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
});
