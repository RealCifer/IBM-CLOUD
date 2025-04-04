import React from 'react';

const Track = () => {
  const items = [
    { title: "Clothes", icon: "👗", color: "from-blue-400 to-blue-300" },
    { title: "Electronics", icon: "📱", color: "from-purple-400 to-purple-300" },
    { title: "Shoes", icon: "👟", color: "from-pink-400 to-pink-300" },
  ];

  return (
    <section className="py-12 flex justify-center items-center bg-gradient-to-br from-gray-100 to-white">
      <div className="text-center">
        {/* 🔥 Stylish Title */}
        <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
          🔥 Featured Categories
        </h2>

        {/* Cards */}
        <div className="flex justify-center gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white/70 backdrop-blur-xl border border-white shadow-lg rounded-xl p-5 w-44 text-gray-800 text-center 
              transition-all transform hover:scale-110 hover:shadow-[0_0_20px] hover:shadow-${item.color}`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Track;
