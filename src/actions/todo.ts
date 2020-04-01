import { createAction } from "typesafe-actions";
import { Todo } from "Model";
import uniqid from "uniqid";

export const addTodo = createAction("ADD_TODO", (label: string) => ({
  done: false,
  label,
  id: uniqid()
}))<Todo>();

export const setDone = createAction(
  "SET_DONE",
  (id: string, done: boolean) => ({
    id,
    done
  })
)();

export const setLabel = createAction(
  "SET_LABEL",
  (id: string, label: string) => ({
    id,
    label
  })
)();

export const toggleDone = createAction("TOGGLE_DONE", (id: string) => ({
  id
}))();

export const removeTodo = createAction("REMOVE_TODO", (id: string) => ({
  id
}))();
