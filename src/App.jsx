import "./App.css";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
// import { SnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar";
import { AttachmentProvider } from "./Components/MailDialog/attachmentContext";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./clients.js";
import { NotistackSnackbarProvider } from "./Components/SharedSnackbar/SharedSnackbar1";
import { SecretProvider } from "./Contexts/SecretContext.jsx";
import { ThemeContextProvider } from "./Contexts/ThemeContext.jsx";
import ErrorBoundary from "./ErrorController.jsx";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  return (
    <>
      <ThemeContextProvider>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </ThemeContextProvider>
    </>
  );
}

export default App;
