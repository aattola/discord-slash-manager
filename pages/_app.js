import { createGlobalStyle, ThemeProvider } from 'styled-components';
// import { Provider, teamsTheme } from '@fluentui/react-northstar';
import {
  createTheme,
  ThemeProvider as Provider,
} from '@material-ui/core/styles';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .MuiButton-containedPrimary {
    background-color: #ffbfab !important;
  }
`;

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#bd6754',
      contrastText: '#442C2E',
      dark: '#ffc8b7',
    },
    secondary: {
      main: '#FEEAE6',
      contrastText: '#442C2E',
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    button: {
      fontFamily: '"Rubik", "Roboto", "Arial", sans-serif',
      fontSize: 14,
      fontWeight: 500,
    },
    fontFamily: '"Rubik", "Roboto", "Arial", sans-serif',
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: '#FEDBD0',
        // border: 8,
        borderRadius: 8,
        color: '#442C2E',
      },
    },
  },
});

// const theme = {
//   colors: {
//     primary: '#0070f3',
//   },
// };

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Provider theme={theme}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
