import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useGetCommentsQuery, useGetPostsQuery } from './store/services/posts';

function App() {

  const [id, setId] = useState(null);
  const { data: commentData, refetch: commentRefetch } = useGetCommentsQuery(
    id !== null && { postId : id }
  );
  const commentList = useMemo(() => commentData, [commentData]);

  const { data: postData, refetch: postRefetch } = useGetPostsQuery(null);
  const [post, setPost] = useState(postData && postData);

  return (
    <div className="App"></div>
  );
}

export default App;
