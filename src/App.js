import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useGetCommentsQuery, useGetPostsQuery } from './store/services/posts';

function App() {

  const [id, setId] = useState(null);
  const { data: commentData, refetch: commentRefetch } = useGetCommentsQuery(
    id !== null && { postId : id }
  );
  const commentList = useMemo(() => commentData, [commentData]);

  const { data: postData, refetch: postRefetch } = useGetPostsQuery();
  const [post, setPost] = useState(postData && postData);

  const onSubmit = (e) => {
    e.preventDefault();
    setId(1);
  }

  useEffect(() => {
    setPost(postData);
    postRefetch();
    commentRefetch();
  }, [postData, commentData])

  return (
    <div className="App">
      {
        post && 
        post.map(item => (
          <div key={item.id}>
            Post {item.id} - {item.title}
          </div>
        ))
      }
      <br />
      <form onSubmit={onSubmit}>
        <button>submit</button>
      </form>
      {
        commentList?.map(comment => (
          <div key={comment.id}>{comment.email}</div>
        ))
      }
    </div>
  );
}

export default App;
