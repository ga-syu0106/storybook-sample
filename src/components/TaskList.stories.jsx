import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { TasksSlice } from "../lib/store";

export const mockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null,
};

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: "3rem" }}>
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
  excludeStories: /.*mockedState$/,
};

const MockStore = ({ tasksBoxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskBox: TasksSlice.reducer,
      },
      preloadedState: {
        taskBox: tasksBoxState,
      },
    })}
  >
    {children}
  </Provider>
);

export const Default = {
  decorators: [
    (story) => <MockStore tasksBoxState={mockedState}>{story()}</MockStore>,
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...mockedState.tasks.slice(0, 5),
        {
          id: "6",
          title: "Task 6(pinned)",
          state: "TASK_PINNED",
        },
      ];

      return (
        <MockStore tasksBoxState={{ ...mockedState, tasks: pinnedTasks }}>
          {story()}
        </MockStore>
      );
    },
  ],
};

export const Loading = {
  decorators: [
    (story) => (
      <MockStore tasksBoxState={{ ...mockedState, status: "loading" }}>
        {story()}
      </MockStore>
    ),
  ],
};

export const Empty = {
  decorators: [
    (story) => (
      <MockStore tasksBoxState={{ ...mockedState, tasks: [] }}>
        {story()}
      </MockStore>
    ),
  ],
};
