import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const TodoItem = (props) => {
  const { title, id, status, handleUpdate, handleDelete } = props;
  return (
    <div key={id} className="todoItemDiv">
      <h4>{title}</h4>
      <button id="statusBtn" onClick={() => handleUpdate(id)}>
        {status ? <TaskAltIcon /> : <HourglassTopIcon />}
      </button>
      <button id="deleteBtn" onClick={() => handleDelete(id)}>
        <DeleteSweepIcon />
      </button>
    </div>
  );
};
export { TodoItem };
