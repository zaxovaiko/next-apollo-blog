import { Switch } from "react-router-dom";
import { Route } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddPost from "../pages/post/AddPost";

function ProtectedRoute() {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/posts" component={AddPost} exact />
    </Switch>
  );
}

export default ProtectedRoute;
