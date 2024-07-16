import { Provider } from "react-redux";
import InBoxScreen from "./InBoxScreen";
import store from "../lib/store";
import { mockedState } from "./TaskList.stories";
import { http, HttpResponse } from "msw";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";
export default {
  component: InBoxScreen,
  title: "InBoxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return HttpResponse.json(mockedState.tasks);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
    await waitFor(async () => {
      await fireEvent.click(canvas.getByLabelText("pinTask-1"));
      await fireEvent.click(canvas.getByLabelText("pinTask-3"));
      await fireEvent.click(canvas.getByLabelText("archiveTask-5"));
    });
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return HttpResponse.json(null, { status: 403 });
        }),
      ],
    },
  },
};
