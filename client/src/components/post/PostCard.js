import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import { Card } from "react-bootstrap";

export default function PostCard({
  id,
  text,
  user,
  likes,
  comments,
  createdAt,
  updatedAt,
}) {
  const [showMoreText, setShowMoreText] = useState(false);

  return (
    <Card className="p-3 mt-3">
      <div className="d-flex align-items-center mb-3">
        <img
          src={user.avatar}
          alt=""
          className="rounded-circle"
          style={{ width: "65px" }}
        />
        <h6 className="fw-bold ms-2 mb-0">{user.name}</h6>
        <p className="ms-auto small mb-0 text-muted">
          {moment(+createdAt).fromNow()}
        </p>
      </div>
      <p className="text-black-50">
        {showMoreText ? text : text.substr(0, 350) + "..."}{" "}
        <span className="text-black small" onClick={() => setShowMoreText((p) => !p)}>
          Show {showMoreText ? "less" : "more"}
        </span>
      </p>
    </Card>
  );
}

PostCard.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.object,
  likes: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};
