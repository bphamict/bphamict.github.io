import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import Helmet from 'react-helmet';

import Layout from '../../Layouts';
import { postFeedback } from '../../Api/feedback';
import { RECAPTCHA_KEY, APP_NAME } from '../../Configs';

function Feedback() {
  const emailRef = useRef(null);
  const typeRef = useRef(null);
  const contentRef = useRef(null);
  const recaptchaRef = useRef(null);
  const [recaptcha, setRecaptcha] = useState();

  const submit = (e) => {
    e.preventDefault();
    recaptchaRef.current.execute();
    const email = emailRef.current.value;
    const type = typeRef.current.value;
    const content = contentRef.current.value;

    postFeedback({ email, type, content }, recaptcha)
      .then((e) => {
        console.log(e.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    loadReCaptcha(RECAPTCHA_KEY);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Feedback - {APP_NAME}</title>
      </Helmet>
      <h2>Phản hồi</h2>
      <hr style={{ marginTop: 0 }} />
      <Row>
        <Col md={6}>
          <Form onSubmit={(e) => submit(e)}>
            <Form.Group>
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Loại phản hồi</Form.Label>
              <Form.Control as="select" ref={typeRef}>
                <option value="bug-report">Báo cáo lỗi</option>
                <option value="question">Câu hỏi</option>
                <option value="suggestion">Gợi ý tính năng</option>
                <option value="other">Khác</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập nội dung"
                ref={contentRef}
                rows={3}
              />
            </Form.Group>
            <ReCaptcha
              ref={recaptchaRef}
              sitekey={RECAPTCHA_KEY}
              action="submit"
              verifyCallback={(e) => setRecaptcha(e)}
            />
            <Button variant="primary" type="submit">
              Gửi phản hồi
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default Feedback;
