import { useFormik } from "formik";
import { Form, Row, Button, Col } from "react-bootstrap";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Row>
      <Col xs={{ span: 6, offset: 3 }}>
        <Form className="pt-5 mt-5" onSubmit={formik.handleSubmit}>
          <h3 className="text-center fw-bold">Log in</h3>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              placeholder="john.doe@gmail.com"
              type="email"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
            />
          </Form.Group>

          <Button className="float-end" type="submit">
            Log in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
