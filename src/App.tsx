import { RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './App.css';
import { router } from './routes/router';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
