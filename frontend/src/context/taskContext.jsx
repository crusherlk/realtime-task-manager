import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
const TaskProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <TaskContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const TaskState = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
