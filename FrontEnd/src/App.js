import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import Rank from './pages/Rank/Rank';
import Error from './pages/Error/Error';

function App() {
  return (
    <div className="grid grid-cols-16">
      <div className="col-start-2 lg:col-start-3 col-end-16 lg:col-end-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="practice" element={<Practice />} />
          <Route path="rank" element={<Rank />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
