import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

export function AuthRedirect() {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    return <BarLoader />;
  }

  if (authContext?.user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
