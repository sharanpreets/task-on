import React from "react";
import "../../style/taskInputStyle.css"

const TaskInput = ({ task, setTask, handleAddTodo, editChangeIcon }) => {
  

  return <div className="my-4 mx-auto px-4 addTask-section">
    <div className="row gap-2">
      {/* add task */}
      <input type="text" className="form-control col-md-12"
        placeholder="Add new task..." value={task?.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
      {/* select task type */}
      <select className="col-md-12" style={{ width: "100%", height: "38px", borderRadius: "8px", borderColor: "#DEE2E6", padding:"8px" }} value={task?.type} onChange={(e) => setTask({ ...task, type: e.target.value })}>
        <option value="" disabled selected>Select Type</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="button" className="btn col-md-12 text-white" style={{ background: "#1A8754" }} onClick={handleAddTodo} >
        {editChangeIcon ?
          "Add Task": "Edit Task"}
      </button>
    </div>
  </div>
}

export default TaskInput;