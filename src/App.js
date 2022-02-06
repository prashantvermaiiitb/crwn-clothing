import './App.css';
import HomePage from './pages/homepage.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HatsPage = () => {
  return (
    <div>
      <h1>HATS Page</h1>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/hats' element={<HatsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
