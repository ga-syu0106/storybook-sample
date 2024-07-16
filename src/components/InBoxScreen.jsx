import { useDispatch, useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { fetchTasks } from "../lib/store";

export default function InBoxScreen() {
  const { error } = useSelector((state) => state.taskBox);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">TaskBox</h1>
      </nav>
      <TaskList />
    </div>
  );
}
