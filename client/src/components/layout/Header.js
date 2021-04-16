import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="py-5">
      <Link to="/" className="text-decoration-none text-dark">
        <h1 className="text-center fw-bold mb-5">
          <i className="bi bi-chat-right me-3"></i>apollo-blog
        </h1>
      </Link>
      <div className="mx-auto text-center">
        <Link to="/login" className="text-decoration-none me-3">
          Log in
        </Link>
        <Link to="/signup" className="btn btn-primary rounded-pill">
          Sign up
        </Link>
      </div>
    </div>
  );
}
