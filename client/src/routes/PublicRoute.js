import { Route } from "react-router-dom";
import Post from "../pages/post";

function PublicRoute() {
  return (
    <>
      <Route path="/" component={Post} exact />
    </>
  );
}

export default PublicRoute;
