const Testimonial = () => {
    return (
        <>
            <style>
                {`
                    @keyframes glow {
                        0% { box-shadow: 0 0 5px rgba(255, 105, 180, 0.5); }
                        50% { box-shadow: 0 0 15px rgba(255, 105, 180, 0.8); }
                        100% { box-shadow: 0 0 5px rgba(255, 105, 180, 0.5); }
                    }
                    .glow-box {
                        animation: glow 1.5s infinite alternate;
                        border-radius: 8px;
                    }
                `}
            </style>
            <section className="text-gray-700 body-font mb-6">
                <div className="container px-4 py-6 mx-auto">
                    <h1 className="text-center text-2xl font-bold text-gray-900">Testimonials</h1>
                    <h2 className="text-center text-base font-semibold text-gray-600 mb-6">
                        What our <span className="text-pink-500">customers</span> are saying
                    </h2>
                    <div className="flex flex-wrap -m-2">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="lg:w-1/3 p-2">
                                <div className="h-full text-center bg-white shadow-lg rounded-lg p-3 transition transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 border border-pink-400 glow-box relative overflow-hidden">
                                    <img 
                                        alt="testimonial" 
                                        className="w-14 h-14 mb-3 object-cover object-center rounded-full border-4 border-pink-500 mx-auto transition-transform hover:scale-110" 
                                        src={testimonial.img} 
                                    />
                                    <p className="leading-relaxed text-gray-600 text-xs relative z-10">{testimonial.feedback}</p>
                                    <span className="inline-block h-1 w-8 rounded bg-pink-500 mt-3 mb-2 relative z-10" />
                                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase relative z-10">{testimonial.name}</h2>
                                    <p className="text-gray-500 text-xs relative z-10">{testimonial.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

const testimonials = [
    {
        name: "JHEEL MEHTA",
        position: "Student at IIIT-DWD",
        feedback: "This platform is amazing! The UI is smooth and intuitive.",
        img: "https://www.devknus.com/img/gawri.png"
    },
    {
        name: "SONALIKA BHIDE",
        position: "Student at IIIT-DWD",
        feedback: "Great experience! The customer service was outstanding.",
        img: "https://www.devknus.com/img/gawri.png"
    },
    {
        name: "DAYA GADA",
        position: "Student at IIIT-DWD",
        feedback: "I love the design and ease of use. Highly recommended!",
        img: "https://www.devknus.com/img/gawri.png"
    }
];

export default Testimonial;
