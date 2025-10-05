import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MoveDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>,
    errorElement:<NotFoundPage/>,
    children:[{
      path:'movies/:category',
      element:<MoviePage/>,
    },
    {
      path:'movie/:movieId',
      element:<MoveDetailPage/>,
    },
  
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}


export default App
