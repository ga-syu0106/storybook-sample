import { Provider, useDispatch } from "react-redux";
import "./App.css";
import InBoxScreen from "./components/InBoxScreen";
import store from "./lib/store";

function App() {
  return (
    <Provider store={store}>
      <InBoxScreen />
    </Provider>
  );
}

export default App;
