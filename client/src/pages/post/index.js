import { useQuery, gql } from "@apollo/client";
import PostCard from "../../components/post/PostCard";

export default function Post() {
  const { loading, error, data } = useQuery(gql`
    query AllPosts {
      posts {
        id
        text
        user {
          id
          name
          avatar
        }
        createdAt
        updatedAt
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </>
  );
}
