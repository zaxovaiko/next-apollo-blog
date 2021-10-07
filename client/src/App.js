import Header from "./components/layout/Header";
import Routes from "./routes";
import { Container } from "react-bootstrap";
 
function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes />
      </Container>
    </>
  );
}

export default App;
