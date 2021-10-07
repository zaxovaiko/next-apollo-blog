import { useFormik } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function AddPost() {
  const formik = useFormik({
    initialValues: {
      text: "",
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
          <h3 className="text-center fw-bold mb-3">Create new post</h3>
          <Form.Group controlId="text" className="mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.text}
              placeholder="Hello, world"
              as="textarea"
              rows={4}
            />
          </Form.Group>

          <Button variant="success" className="float-end" type="submit">
            Publish
          </Button>
          <Button variant="danger" className="float-end me-2" type="submit">
            Cancel
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
