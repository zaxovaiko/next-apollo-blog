import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Post from "./pages/post";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <Header />
      <div className="container py-3 flex-grow-1">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <Switch>
              <Route path="/posts/:postId" exact component={Post} />
              <Route path="/users/:userId" exact component={User} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
