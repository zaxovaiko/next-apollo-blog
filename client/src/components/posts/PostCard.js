import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const [text, setText] = useState({
    text: post.text,
    show: false,
  });

  // TODO: Cut only if length is > 300 and show only half of the text
  const { user, votes, createdAt } = post;

  return (
    <div className="col-12 mb-4">
      <div className="d-flex border rounded p-4">
        <div className="flex-shrink-0">
          <img
            className="rounded-circle"
            style={{ width: "65px" }}
            src={user && user.avatar}
            alt="User"
          />
          <p className="text-center my-2 text-muted fw-bold">{votes}</p>
        </div>
        <div className="flex-grow-1 ms-3">
          <h3 className="fs-6 fw-bold">
            <Link
              to={`/users/${user && user.id}`}
              className="text-decoration-none text-dark"
            >
              {user && user.name}{" "}
              {user && user.role === "admin" && (
                <span className="badge bg-danger align-middle rounded-pill">
                  <i class="bi bi-award" />
                </span>
              )}
            </Link>
            <span className="float-end small fw-normal text-muted">
              {moment(createdAt, "x").fromNow()}
            </span>
          </h3>
          <p className="text-dark mb-0">
            {text.show ? text.text : text.text.substr(0, 400) + "..."}
            {text.text.length > 400 && (
              <p
                className="text-muted small mt-2"
                onClick={() => setText((p) => ({ ...p, show: !p.show }))}
              >
                Show more
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
