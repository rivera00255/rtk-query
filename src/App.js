import { useEffect, useState } from 'react';
import './App.css';
import { useGetPostsQuery } from './store/services/posts';

function App() {

  const { data: postData, refetch } = useGetPostsQuery();
  const [post, setPost] = useState(postData && postData);

  useEffect(() => {
    setPost(postData);
    refetch();
  }, [postData])

  return (
    <div className="App">
      {
        post && 
        post.map(item => (
          <div key={item.id}>{item.title}</div>
        ))
      }
    </div>
  );
}

export default App;
