import { useQuery, gql } from "@apollo/client";
import PostCard from "../components/posts/PostCard";

const ALL_POSTS = gql`
  query {
    posts {
      id
      text
      votes
      user {
        id
        name
        avatar
        role
      }
      createdAt
    }
  }
`;

// TODO: On user delete -> remove posts
export default function Home() {
  const { loading, error, data } = useQuery(ALL_POSTS);

  return (
    <div className="row">
      <div className="col-12 col-md-8 offset-md-2 mb-4">
        <div className="row">
          {loading && (
            <div className="spinner-border mx-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {error && (
            <div className="alert alert-danger mx-auto w-50" role="alert">
              {error.message}
            </div>
          )}
          {data &&
            data.posts &&
            data.posts.length > 0 &&
            data.posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
