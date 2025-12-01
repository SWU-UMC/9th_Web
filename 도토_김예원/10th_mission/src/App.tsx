import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MovieDetail from "./pages/MovieDetail";
// import UseCallBackPage from './pages/UseCallbackPage';
// import UseMemoPage from './pages/UseMemoPage';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col justify-center items-center'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
