import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

// /video 페이지 컴포넌트
function VideoPage() {
  const [videoData, setVideoData] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleProcessClick = async () => {
    console.log("Process Video 버튼이 클릭되었습니다.");

    const selectedOptions = [];
    if (isChecked1) selectedOptions.push("headbanging");
    if (isChecked2) selectedOptions.push("handclapping");

    try {
      const response = await axios.post('http://localhost:8000/video/process', {
        selectedOptions: selectedOptions
      });
      setVideoData(response.data);
    } catch (error) {
      console.error("Error processing the video", error);
    }
  };

  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h1>Video Processing Page</h1>
          <Form>
            <Form.Check 
              type="checkbox" 
              label="Head Banging" 
              checked={isChecked1} 
              onChange={handleCheckbox1Change} 
            />
            <Form.Check 
              type="checkbox" 
              label="Hand Clapping" 
              checked={isChecked2} 
              onChange={handleCheckbox2Change} 
            />
          </Form>
          <Button onClick={handleProcessClick}>Process Video</Button>

          {videoData ? (
            <div>
              {/* Metadata 섹션 */}
              <h3>Metadata</h3>
              {videoData.metadata ? (
                <div>
                  <p>Duration: {videoData.metadata.duration} seconds</p>
                  <p>FPS: {videoData.metadata.fps}</p>
                  <p>Size: {videoData.metadata.size[0]} x {videoData.metadata.size[1]} pixels</p>
                </div>
              ) : (
                <p>No metadata available</p>
              )}

              {/* Behavior Data 섹션 */}
              {videoData.behavior_data && videoData.behavior_data.length > 0 ? (
                <div>
                  <h3>Behavior Data</h3>
                  <ul>
                    {videoData.behavior_data.map((behavior, index) => (
                      <li key={index}>
                        Timestamp: {behavior.timestamp} - Behavior: {behavior.behavior_type}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No behavior data available</p>
              )}
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;