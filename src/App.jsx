import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import { SnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar";
import { AttachmentProvider } from "./Components/MailDialog/attachmentContext";
import { ApolloProvider } from "@apollo/client";

import { client } from "./clients.js";

function App() {
  // console.clear();

  return (
    <>
      <ApolloProvider client={client}>
        <AttachmentProvider>
          <SnackbarProvider>
            <Header />
            <Body />
          </SnackbarProvider>
        </AttachmentProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
