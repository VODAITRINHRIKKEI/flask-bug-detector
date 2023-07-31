import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1F2133",
    },
    whiteColor: {
      main: "#fff",
    },
    background: {
      default: "#ffffff",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Nav></Nav>
        <Outlet></Outlet>
      </div>
    </ThemeProvider>
  );
}

export default App;
