import './App.css';
import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/About/About';
import ContactUs from './components/Home/ContactUs/ContactUs';
import HomeFooter from './components/Home/Footer/Footer';
function App() {

    return (
        <div className="App">
            <Navbar />
            <ExperienceSupple />
            <BestSellers />
            <About />
            <ContactUs />
            <HomeFooter />
        </div>
    );
}

export default App;
