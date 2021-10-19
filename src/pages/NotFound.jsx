import { useLocation } from "react-router";

const NotFound = () => {
  const location = useLocation();

  return (
      <div>
          <h1>Pagina niet gevonden</h1>
          <p>
              Er is geen pagina met als url {location.pathname}, probeer iets anders.
          </p>
      </div>
  );
};

export default NotFound;