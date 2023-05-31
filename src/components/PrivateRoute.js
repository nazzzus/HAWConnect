import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function PrivateRoute({ children, roles }) {
    const { user, role } = useContext(UserContext);
    const navigate = useNavigate();

    // Wenn der Benutzer nicht eingeloggt ist, leiten Sie ihn zur Anmeldeseite um
    if (!user) {
      navigate("/auth");
      return null;
    }
  
    // Wenn der Benutzer nicht die benötigte Rolle hat, leiten Sie ihn zur Startseite um
    if (roles && roles.indexOf(role) === -1) {
      navigate("/");
      return null;
    }
  
    return children;
}

export default PrivateRoute;

