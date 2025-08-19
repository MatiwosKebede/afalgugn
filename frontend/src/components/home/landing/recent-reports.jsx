import React from "react";

const RecentPosts = () => {
  const posts = [
    {
      name: "Eldana Tariku",
      age: 32,
      gender: "Female",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=400&h=400",
    },
    {
      name: "Lydia Teshome",
      age: 28,
      gender: "Female",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=400&h=400",
    },
    {
      name: "Henok Alemu",
      age: 10,
      gender: "Male",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=400&h=400",
    },
    {
      name: "Dawit Lulie",
      age: 35,
      gender: "Male",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=400&h=400",
    },
  ];

  return (
    <section className="w-full lg:w-5/6 mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img src={post.image} alt={post.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-1">{post.name}</h3>
              <p className="text-gray-600 mb-1">Age: {post.age}</p>
              <p className="text-gray-600 mb-4">Gender: {post.gender}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
          View More
        </button>
      </div>
    </section>
  );
};

export default RecentPosts;
