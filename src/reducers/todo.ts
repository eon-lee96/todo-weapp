import { Todo } from "Model";
import { createReducer } from "typesafe-actions";

import actions from "../actions";

export default createReducer([] as Todo[])
  .handleAction(actions.todo.addTodo, (state, action) => {
    return [...state, action.payload];
  })
  .handleAction(actions.todo.setDone, (state, action) => {
    return state.map(i =>
      i.id === action.payload.id
        ? {
            ...i,
            done: action.payload.done
          }
        : i
    );
  })
  .handleAction(actions.todo.setLabel, (state, action) => {
    return state.map(i =>
      i.id === action.payload.id
        ? {
            ...i,
            label: action.payload.label
          }
        : i
    );
  })
  .handleAction(actions.todo.toggleDone, (state, action) => {
    return state.map(i =>
      i.id === action.payload.id ? { ...i, done: !i.done } : i
    );
  })
  .handleAction(actions.todo.removeTodo, (state, action) => {
    return state.filter(i => i.id !== action.payload.id);
  });
