import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // 첫 번째 페이지인 홈 페이지 컴포넌트를 임포트합니다.
import VideoPage from './VideoPage'; // 두 번째 페이지인 비디오 처리 페이지 컴포넌트를 임포트합니다.

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로 ("/")로 접근할 때 홈 페이지가 렌더링됩니다. */}
        {/* 예를 들어, 사용자가 http://localhost:3000/로 접근하면 HomePage 컴포넌트가 렌더링됩니다. */}
        <Route path="/" element={<HomePage />} /> 

        {/* "/video" 경로로 접근할 때 비디오 처리 페이지가 렌더링됩니다. */}
        {/* 예를 들어, 사용자가 http://localhost:3000/video로 접근하면 VideoPage 컴포넌트가 렌더링됩니다. */}
        <Route path="/video" element={<VideoPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;