import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
// import { SnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar";
import { AttachmentProvider } from "./Components/MailDialog/attachmentContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./clients.js";
import { NotistackSnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar1";
import { SecretProvider } from "./Contexts/SecretContext.jsx";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <SecretProvider>
          <AttachmentProvider>
            <NotistackSnackbarProvider>
              <Header />
              <Body />
            </NotistackSnackbarProvider>
          </AttachmentProvider>
        </SecretProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
