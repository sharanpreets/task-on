import React from "react";


const TaskList = ({ taskList, handleDeleteTask, handleEditTask }) => {


  return <section>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card rounded-3">
            <div className="card-body p-4">
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Task</th>
                    <th scope="col" style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taskList?.sort((a, b) => {
                    const order = { high: 0, medium: 1, low: 2 };
                    return order[a?.type] - order[b?.type];
                  })?.map((v, index) => {
                    return <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>{v?.name} ({v?.type})</td>
                      <td className="d-flex gap-2 justify-content-center align-items-center">
                        <button type="submit" className="btn btn-danger" onClick={() => handleDeleteTask(v?.id)}><i className="bi bi-trash"></i></button>
                        <button type="submit" className="btn" style={{ background: "#1A8754" }} onClick={() => handleEditTask(v)}><i className="bi bi-pencil text-white"></i></button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default TaskList;