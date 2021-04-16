import moment from "moment";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import PostCard from "../components/posts/PostCard";

const GET_USERS_POSTS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      role
      avatar
      email
      createdAt
      posts {
        id
        text
        votes
        createdAt
      }
    }
  }
`;

// TODO: Return all fields except of password
export default function User() {
  const { userId } = useParams();
  const { loading, data, error } = useQuery(GET_USERS_POSTS, {
    variables: { id: userId },
  });

  if (loading) {
    return "Loading";
  }

  if (error) {
    return "error" + error.message;
  }

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card">
          <img
            className="w-100 card-img-top"
            src={data.user.avatar}
            alt="User"
          />
          <div className="card-body">
            <h3 className="fw-bold fs-4">
              {data.user.name}
              <span className="badge bg-primary ms-3 align-middle">
                {data.user.role[0]}
              </span>
            </h3>
            <p>
              Joined: <span>{moment(data.user.createdAt, "x").fromNow()}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8">
        {data.user.posts.map((e) => (
          <PostCard key={e.id} post={{ ...e, user: data.user }} />
        ))}
      </div>
    </div>
  );
}
