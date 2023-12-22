import Banner from "./Banner";
import Faq from "./Faq";
import Footer from "./Footer";


const Home = () => {
    return (
        <div className="py-4">
            <Banner></Banner>
            <Faq></Faq>
            <Footer></Footer>
        </div>
    );
};

export default Home;