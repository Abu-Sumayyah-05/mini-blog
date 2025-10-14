import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams(); // get the post ID from the URL
  const [post, setPost] = useState(null); // to store the post data

  useEffect(() => {
    // fetch the post data here
    axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
        setPost(response.data);
    })
    .catch((error) => {
        console.error("Error fetching posts:", error);

    });
  }, [id]);

  return (
    <div className="container mx-auto p-6 bg-[#F5EBDD]">
  {post ? (
  <>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
    <Link to="/">← Back to Home</Link>
  </>
) : (
  <p>Loading...</p>
)}

    </div>
  );
}




export default PostDetails;