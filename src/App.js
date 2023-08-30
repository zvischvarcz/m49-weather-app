import './App.css';
import Weather  from "./components/weather"
import Home from "./components/home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}></Route>
        <Route path="/weather" element={<Weather />}></Route>
      </Routes>
    </BrowserRouter>
        
  )
 
}

export default App;
