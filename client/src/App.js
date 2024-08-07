
import './App.css';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/login';
import UserBlogs from './pages/UserBlogs';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path = "/" element={<Blogs/>} />
      <Route path = "/blogs" element={<Blogs/>} />
      <Route path = "/my-blogs" element={<UserBlogs/>} />
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/register" element={<Register/>} />
    </Routes>
    </>
  );
}

export default App;
