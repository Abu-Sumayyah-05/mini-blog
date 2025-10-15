import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // posts are being fetched here

        axios 
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            setPosts(response.data);
            setLoading(false);

            // fetch author details for each post
            response.data.forEach(post => {
                if (!authors[post.userId]){
                    axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                     .then(userRes => {
                        setAuthors(prev => ({... prev, [post.userId]: userRes.data}));
                     })
                     .catch(err => console.error(err));
                }
            });
        })


        .catch((err) => {
        setError("Failed to fetch posts");
        setLoading(false);
      });

    }, []);


      const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-blue-500 mt-10">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

    return (
        <div className="flex flex-col bg-blue-600  text-center  justify-center items-center gap-8">
            <h1 className="bg-white justify-center font-bold p-4 text-2xl flex w-[100%]">Blog Posts</h1>

            {/*  search input */}
            <input 
            type="text"
            placeholder="search posts by title..."
            className="border border-gray-300 p-2 rounded w-full mb-6 text-center "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
             />

            {/* We'll display posts here */}
            {filteredPosts.map((post) => (
                <div key={post.id} className="gap-10">
                 <h2 className="text-white font-bold">{post.title}</h2>
                 <p className="text-white font-bold">{post.body.slice(0, 80)}...</p>
                   {authors[post.userId] && (
        <p><strong>Author:</strong> {authors[post.userId].name}</p>
      )}
                 <Link to={`/posts/${post.id}`} className="bg-black text-white top-[10px]  px-5 py-1 rounded font-bold relative">Read More</Link>
                </div>
            ))}
        </div>
    );
}


export default Home;