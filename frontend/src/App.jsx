import "./app.scss";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import About from "./components/About/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Logout from "./components/Login/Logout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/Reducer";

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <SignUp />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: "/logout",
      element: (
        <>
          <Navbar />
          <Logout />
        </>
      ),
    },
  ]);

  return (
    <>
      <div className="main-container">
        <AppContext.Provider value={{ state, dispatch }}>
          <RouterProvider router={router} />
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
