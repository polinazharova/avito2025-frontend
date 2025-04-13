import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './widgets/footer';
import Header from './widgets/header';
import IssuesPage from './pages/IssuesPage';
import BoardsPage from './pages/BoardsPage';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/issues' element={<IssuesPage />} />
        <Route path='/boards' element={<BoardsPage />} />
        <Route path='/board/:id' element={<BoardPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
