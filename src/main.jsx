import { render } from 'preact'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { App } from './app.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./redux/store";
import { Provider } from 'react-redux';
// render(<App />, document.getElementById('app'))

ReactDOM.createRoot(document.getElementById("app")).render(
      <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
