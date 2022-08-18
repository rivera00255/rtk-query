import './App.css';
import { useGetPostsQuery } from './store/services/posts';

function App() {

  const { data } =  useGetPostsQuery();
  console.log(data);

  return (
    <div className="App">
    </div>
  );
}

export default App;
