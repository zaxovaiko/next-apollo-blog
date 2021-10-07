import { useFormik } from "formik";
import { Form, Row, Button, Col } from "react-bootstrap";

function Register() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_conf: "",
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
          <h3 className="text-center fw-bold">Create account</h3>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              placeholder="John"
              type="text"
            />
          </Form.Group>

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

          <Form.Group controlId="password_conf" className="mb-3">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password_conf}
              name="password_conf"
              type="password"
            />
          </Form.Group>

          <Button className="float-end" type="submit">
            Sign up
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
