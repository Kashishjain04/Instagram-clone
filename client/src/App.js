import "./main.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";
import Explore from "./pages/Explore";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  if (!user) {
    if (localStorage.getItem("user")) {
      dispatch(actions.loginSuccess(JSON.parse(localStorage.getItem("user"))))
    } else{
      history.push("/login");
    }
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/profile/:id" component={UserProfile} />
        <Route path="/explore" component={Explore} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create" component={CreatePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
