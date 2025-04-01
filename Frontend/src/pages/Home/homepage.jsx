import { useContext } from "react";
import Layout from "../../Components/Layout/layout"
import Category from "../../Components/category/Category";
import HeroSection from "../../Components/heroSection/HeroSection";
import HomePageProductCard from "../../Components/homePageProductCard/HomePageProductCard";
import Testimonial from "../../Components/testimonial/Testimonial";
import Track from "../../Components/track/Track";
import myContext from "../../context/myContext";
import CartPage from "../cart/CartPage";
import MyState from "../../context/myState";



export default function homepage() {
 
  return (
    // <MyState>
      <Layout>
        
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <Track/>
        <Testimonial/>
        {/* <CartPage/> */}
        
      </Layout>
    // </MyState>
  );
}
