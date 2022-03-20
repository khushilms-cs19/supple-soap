import './App.css';
import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';
import About from './components/Home/About/About';
function App() {

    return (
        <div className="App">
            <Navbar />
            <ExperienceSupple />
            <BestSellers />
            <About />
        </div>
    );
}

export default App;
