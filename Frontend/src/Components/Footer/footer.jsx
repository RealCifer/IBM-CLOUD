import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <style>
                {`
                    .glow-effect {
                        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff;
                    }
                `}
            </style>
            <footer className="text-black body-font bg-[#dc7cae] py-5">
                <div className="container px-5 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
                        <span className="text-xl font-bold font-[Poppins] glow-effect">
                            CLOUD-STORE
                        </span>
                    </a>
                    <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-black sm:py-2 sm:mt-0 mt-4 font-[Poppins]">
                        © 2025 eCloudStore —
                        <Link to={'/'} className="text-black ml-1" rel="noopener noreferrer" target="_blank">
                            @CloudStore
                        </Link>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
                        <a className="text-white cursor-pointer transform transition-all duration-300 hover:scale-125" href="https://www.instagram.com">
                            <i className="fab fa-instagram text-2xl glow-effect"></i>
                        </a>
                        <a className="text-white cursor-pointer transform transition-all duration-300 hover:scale-125" href="https://www.twitter.com">
                            <i className="fab fa-twitter text-2xl glow-effect"></i>
                        </a>
                        <a className="text-white cursor-pointer transform transition-all duration-300 hover:scale-125" href="https://www.facebook.com">
                            <i className="fab fa-facebook text-2xl glow-effect"></i>
                        </a>
                        <a className="text-white cursor-pointer transform transition-all duration-300 hover:scale-125" href="https://www.linkedin.com">
                            <i className="fab fa-linkedin text-2xl glow-effect"></i>
                        </a>
                        <a className="text-white cursor-pointer transform transition-all duration-300 hover:scale-125" href="https://www.youtube.com">
                            <i className="fab fa-youtube text-2xl glow-effect"></i>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
