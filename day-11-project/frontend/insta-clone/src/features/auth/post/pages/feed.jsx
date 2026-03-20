import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usepost";
import Nav from "../../../shared/components/Nav";

const Feed = () => {
  const { feed, handlegetfeed, loading } = usePost();

  useEffect(() => {
    handlegetfeed();
  }, []);

  if (loading) {
    return <main><h1>Feed is loading...</h1></main>;
  }

  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed?.length ? (
            feed.map((post) => (
              <Post
                key={post._id}
                user={post.user}
                post={post}
              />
            ))
          ) : (
            <p>No posts found in feed.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
