import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

function ProtectedRoute() {
  return <>
    <Login />
    <Register />
  </>;
}

export default ProtectedRoute;
