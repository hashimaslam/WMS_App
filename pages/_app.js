import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import GlobalStyles from "../components/GlobalStyles";
import "../styles/globals.css";
import "../modules/inbound/components/barcode/BarcodeScanner.css";
import { SnackbarProvider } from "notistack";
import { XCircle as CrossIcon } from "react-feather";
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const store = useStore();
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyles />
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
              <Button onClick={onClickDismiss(key)} style={{ color: "white" }}>
                <CrossIcon />
              </Button>
            )}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
