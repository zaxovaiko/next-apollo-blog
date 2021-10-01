import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function Routes() {
  return (
    <>
      <ProtectedRoute />
      <PublicRoute />
    </>
  );
}
