// import { Navbar } from "@material-tailwind/react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer"


const Layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div className="main-content min-h-screen">
                {children}
            </div>
           
            <Footer/>
        </div>
    );
}

export default Layout;
