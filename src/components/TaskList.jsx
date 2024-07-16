import React from "react";
import Task from "./Task";
import PropType from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";
export default function TaskList() {
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskBox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskBox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  });

  const { status } = useSelector((state) => {
    return state.taskBox;
  });

  const dispatch = useDispatch();

  const updateState = (id, state) => {
    const newTaskState = state === "TASK_INBOX" ? "TASK_PINNED" : "TASK_INBOX";
    dispatch(updateTaskState({ id: id, newTaskState: newTaskState }));
  };

  const archiveState = (id) => {
    const newTaskState = "TASK_ARCHIVED";
    dispatch(updateTaskState({ id: id, newTaskState: newTaskState }));
  };

  const LoadingRow = () => {
    return (
      <div className="loading-item">
        <span className="glow-checkbox"></span>
        <span className="glow-text">
          <span>Loading</span> <span>cool</span> <span>state</span>
        </span>
      </div>
    );
  };

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key="loading">
        {LoadingRow()}
        {LoadingRow()}
        {LoadingRow()}
        {LoadingRow()}
        {LoadingRow()}
        {LoadingRow()}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check"></span>
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="empty">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onUpdateState={(id, state) => updateState(id, state)}
            onArchiveState={(id) => archiveState(id)}
          />
        );
      })}
    </div>
  );
}
