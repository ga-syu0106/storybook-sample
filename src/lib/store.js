import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
const defaultTask = [
  { id: "1", title: "Something 1", state: "TASK_INBOX" },
  { id: "2", title: "Something 2", state: "TASK_INBOX" },
  { id: "3", title: "Something 3", state: "TASK_INBOX" },
  { id: "4", title: "Something 4", state: "TASK_INBOX" },
];
const TaskBoxData = {
  tasks: defaultTask,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();

  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));

  return result;
});

export const TasksSlice = createSlice({
  name: "taskBox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id == id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tasks = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = "failed";
      state.error = "Error is occur";
      state.tasks = [];
    });
  },
});

export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
  reducer: {
    taskBox: TasksSlice.reducer,
  },
});

export default store;
