import React, { useEffect, useState } from "react";
import TaskInput from "@/components/taskInput";
import TaskList from "@/components/taskList";
import { toast } from 'react-toastify';
import { getFromLocalStorage, saveToLocalStorage } from "@/utility/localStorageUtils";
import SignOutBtn from "@/components/button/signOutBtn";

const Home = () => {
  const [task, setTask] = useState()
  const [taskList, setTaskList] = useState([])
  const [editChangeIcon, setEditChangeIcon] = useState(true)
  const [edtiTaskId, setEdtiTaskId] = useState()

  const handleAddTodo = () => {

    // task input validation
    if (!task || !task?.name?.trim()) {
      return toast.warning("Please enter a task.", {
        position: "top-center",
        autoClose: 1000
      })
    }

    if (!task?.type) {
      return toast.warning("Please enter a task type.", {
        position: "top-center",
        autoClose: 1000
      })
    }

    // task add and edit with condition
    if (!editChangeIcon) {
      const updatedTaskList = taskList.map((value) => {
        if (edtiTaskId === value.id) {
          return { ...value, name: task.name , type: task.type };
        }
        return value
      })
      setTaskList(updatedTaskList);
      setEditChangeIcon(true);
      setTask({ name: "", type: "" });
      toast.success("Task Edit successfully!", {
        position: "top-center",
        autoClose: 1000
      })

    } else {
      setTaskList([...taskList, { ...task, id: new Date().getMilliseconds().toString() }]),
        setTask({ name: "", type: "" })
      toast.success("Task added successfully!", {
        position: "top-center",
        autoClose: 1000
      })
    }
  }

  // task edit 
  const handleEditTask = (editTask) => {
    setTask(editTask)
    setEdtiTaskId(editTask?.id)
    setEditChangeIcon(false)

  }

  // task delete
  const handleDeleteTask = (id) => {
    const deleteTask = taskList?.filter((v) => v?.id != id)
    setTaskList(deleteTask)
    toast.success("Task deleted successfully!", {
      position: "top-center",
      autoClose: 1000
    })
  }

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const storedTasks = getFromLocalStorage('tasks');
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  
  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    saveToLocalStorage('tasks', taskList);
  }, [taskList]);

  return <>
  <div className="d-flex justify-content-center mt-4">
    <SignOutBtn />
    </div>
    <TaskInput task={task} setTask={setTask} handleAddTodo={handleAddTodo} editChangeIcon={editChangeIcon} />
    {taskList?.length ? <TaskList taskList={taskList} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} /> : null}
  </>
}

export default Home;