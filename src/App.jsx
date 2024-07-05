import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import { SnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar";
import { AttachmentProvider } from "./Components/MailDialog/attachmentContext";

function App() {
  // console.clear();

  return (
    <>
      <AttachmentProvider>
        <SnackbarProvider>
          <Header />
          <Body />
        </SnackbarProvider>
      </AttachmentProvider>
    </>
  );
}

export default App;
