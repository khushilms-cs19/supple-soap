import './App.css';
import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/About/About';
import ContactUs from './components/Home/ContactUs/ContactUs';
function App() {

    return (
        <div className="App">
            <Navbar />
            <ExperienceSupple />
            <BestSellers />
            <About />
            <ContactUs />
        </div>
    );
}

export default App;
