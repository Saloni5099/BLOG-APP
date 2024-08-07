import React, {useState,useEffect} from 'react'
import axios from "axios";

const UserBlogs = () => {
    const [blogs,setBlogs] = useState([]);
    //get user blogs
    const getUserBlogs = async()=>{
        try {
            const id = localStorage.getItem("userId");
            const {data} = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if(data?.success){
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };
   
    useEffect(()=>{
        getUserBlogs();
    },[]);
  console.log(blogs);
  return (
    <div>
      <h1>UserBLogs</h1>
    </div>
  )
}

export default UserBlogs;
  