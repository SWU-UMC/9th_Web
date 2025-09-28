import './App.css'
import { BrowserRouter,Link, Route, Routes } from 'react-router-dom';

const DottoPage = () => <h1>도토 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const YewonPage = () => <h1>예원 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/dotto'>Dotto</Link>
      <Link to='/aeong'>Aeong</Link>
      <Link to='/yewon'>Yewon</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  // 리액트 버전 6부터는 component가 아닌 element 사용
  // <BrowerRouter>를 필수적으로 감싸줘야함.
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/dotto' element={<DottoPage />} />
        <Route path='/aeong' element={<AeongPage />} />
        <Route path='/yewon' element={<YewonPage />} />
        <Route path='/not-found' element={<NotFoundPage />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
