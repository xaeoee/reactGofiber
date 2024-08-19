import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 관리

  const handleGoToVideoPage = () => {
    navigate('/video'); // /video 경로로 이동
  };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h1>Welcome to the Home Page</h1>
          <Button onClick={handleGoToVideoPage}>Go to Video Page</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;