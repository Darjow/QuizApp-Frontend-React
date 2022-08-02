import { useLocation } from "react-router";


const NotFound = () => {
  const location = useLocation();

  return (
      <div>
          <h1>Page not found</h1>
          <p>
              No page is found with url {location.pathname}.
          </p>
      </div>

  )
};

export default NotFound;