import Taro, { FC, useState, useCallback } from "@tarojs/taro";
import {
  View,
  Checkbox,
  Label,
  Button,
  Input,
  CheckboxGroup
} from "@tarojs/components";
import { useDispatch } from "@tarojs/redux";
import { Todo } from "Model";
import { InputProps } from "@tarojs/components/types/Input";
import { BaseEventOrig } from "@tarojs/components/types/common";

import actions from "../../actions";
import "./index.less";

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const id = todo && todo.id;
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const handleDestroy = useCallback(() => {
    dispatch(actions.todo.removeTodo(todo.id));
    // eslint-disable-next-line
  }, [id, dispatch]);
  const openEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditing(false);
  }, []);

  const handleConfirm = useCallback(
    (e: BaseEventOrig<InputProps.inputEventDetail>) => {
      dispatch(actions.todo.setLabel(id, e.detail.value));
    },
    [id, dispatch]
  );

  const handleChange = useCallback(() => {
    dispatch(actions.todo.toggleDone(id));
  }, [dispatch, id]);

  return (
    <View
      className={`${editing ? "editing" : ""} ${
        todo.done ? "completed" : ""
      } li`}
    >
      <View className="view">
        <CheckboxGroup onChange={handleChange}>
          <Checkbox
            value="toggle"
            className={`toggle ${todo.done ? "checked" : ""}`}
            checked={todo.done}
          />
          <Label onLongPress={openEdit} className="label">
            {todo.label}
          </Label>
        </CheckboxGroup>
        <Button onClick={handleDestroy} className="destroy" />
      </View>
      {editing && (
        <Input
          onConfirm={handleConfirm}
          onBlur={closeEdit}
          value={todo.label}
          className="input edit"
        />
      )}
    </View>
  );
};

TodoItem.options && (TodoItem.options.addGlobalClass = true);

export default TodoItem;
