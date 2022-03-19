import './App.css';
import BestSellers from './components/Home/BestSellers/BestSellers';
import ExperienceSupple from './components/Home/ExperieceSupple/ExperienceSupple';
import Navbar from './components/Navbar/Navbar';

function App() {

    return (
        <div className="App">
            <Navbar />
            <ExperienceSupple />
            <BestSellers />
        </div>
    );
}

export default App;
