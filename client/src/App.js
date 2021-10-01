import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Routes from "./routes";

const { SubMenu } = Menu;

function App() {
  return (
    <Layout style={{ height: "100%" }}>
      <Header>header</Header>
      <Layout>
        <Sider style={{ height: "100vh" }}>left sidebar</Sider>
        <Content>
          <Routes />
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default App;
