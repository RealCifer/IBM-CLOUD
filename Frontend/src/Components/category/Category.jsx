import { useNavigate } from "react-router";

const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'Fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'Electronics'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'Shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'Books'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'Groceries'
    }
];

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-20">
            <div className="flex flex-col mt-5">
                <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10 text-center">
                                    <div 
                                        onClick={() => navigate(`/category/${item.name}`)} 
                                        className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all duration-300 hover:bg-pink-400 cursor-pointer mb-1 flex items-center justify-center shadow-lg transform hover:scale-110">
                                        <img src={item.image} alt={item.name} className="w-10 h-10 transition-all duration-300 hover:scale-110" />
                                    </div>
                                    <h1 className='text-sm lg:text-lg font-medium font-[Poppins] text-gray-800 hover:text-pink-500 transition-all duration-300 glow-effect'>{item.name}</h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <style>
                {`
                    .hide-scroll-bar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .hide-scroll-bar::-webkit-scrollbar {
                        display: none;
                    }
                    .glow-effect {
                        text-shadow: 0 0 5px #ffffff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff;
                        font-weight: bold;
                    }
                `}
            </style>
        </div>
    );
};

export default Category;
