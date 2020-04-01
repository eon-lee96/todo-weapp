import Taro, { FC, useState, useMemo, useCallback } from "@tarojs/taro";
import {
  View,
  Input,
  Checkbox,
  Text,
  Label,
  CheckboxGroup,
  Button
} from "@tarojs/components";
import { useSelector, useDispatch } from "@tarojs/redux";
import { InputProps } from "@tarojs/components/types/Input";
import { BaseEventOrig } from "@tarojs/components/types/common";
import { RootState } from "typesafe-actions";
import actions from "../../actions";
import "./index.less";
import Item from "../../components/TodoItem";

type TFilter = "" | "active" | "completed";

const Index: FC = () => {
  const [filter, setFilter] = useState<TFilter>("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const todo = useSelector((state: RootState) => state.todo);
  const visibleTodos = useMemo(
    () =>
      filter
        ? todo.filter(i => (filter === "active" ? !i.done : i.done))
        : todo,
    [todo, filter]
  );
  const left = useMemo(() => todo.reduce((p, c) => p + (c.done ? 0 : 1), 0), [
    todo
  ]);
  const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
    visibleTodos
  ]);

  const onToggleAll = useCallback(() => {
    visibleTodos.forEach(i =>
      dispatch(actions.todo.setDone(i.id, !allSelected))
    );
  }, [visibleTodos, dispatch, allSelected]);

  const onConfirm = useCallback(
    (e: BaseEventOrig<InputProps.inputEventDetail>) => {
      const value = e.detail.value;
      if (value) {
        dispatch(actions.todo.addTodo(value));
        setText("");
      }
    },
    [dispatch]
  );

  const onInput = useCallback(
    (e: BaseEventOrig<InputProps.inputEventDetail>) => {
      setText(e.detail.value);
    },
    []
  );

  const onClearCompleted = useCallback(() => {
    todo.forEach(({ id, done }) => {
      if (done) {
        dispatch(actions.todo.removeTodo(id));
      }
    });
  }, [dispatch, todo]);

  return (
    <View className="todoapp">
      <View className="header">
        <Text className="h1">todo</Text>
        <Input
          value={text}
          onInput={onInput}
          onConfirm={onConfirm}
          className="new-todo input"
          placeholder="What needs to be done?"
        />
      </View>

      {todo.length && (
        <View className="main">
          <CheckboxGroup onChange={onToggleAll}>
            <Checkbox
              value="toggleAll"
              checked={allSelected}
              id="toggle-all"
              className={`toggle-all ${allSelected ? "checked" : ""}`}
            />
            <Label for="toggle-all" className="label" />
          </CheckboxGroup>
          <View className="todo-list">
            {visibleTodos.map(_todo => {
              const { id } = _todo;
              return <Item key={id} todo={_todo} />;
            })}
          </View>
        </View>
      )}

      <View className="footer">
        <View className="todo-count">
          <Text className="strong">{left}</Text> items left
        </View>
        <View className="filters">
          <Button
            onClick={() => setFilter("")}
            className={`li ${filter === "" ? "selected" : ""} `}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("active")}
            className={`li ${filter === "active" ? "selected" : ""} `}
          >
            Active
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            className={`li ${filter === "completed" ? "selected" : ""} `}
          >
            Completed
          </Button>
        </View>

        <Button onClick={onClearCompleted} className="clear-completed">
          Clear completed
        </Button>
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: "Todo"
};

export default Index;
