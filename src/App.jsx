import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import { SnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar";

function App() {
  return (
    <>
      <SnackbarProvider>
        <Header />
        <Body />
      </SnackbarProvider>
    </>
  );
}

export default App;
