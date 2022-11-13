import { TodoItem } from "./TodoItem";
const TodoList = (props) => {
  const { todos, handleUpdate, handleDelete } = props;
  return (
    <div className="allTodoDiv">
      {todos.map((elem) => {
        return (
          <TodoItem
            key={elem.id}
            {...elem}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};
export { TodoList };
