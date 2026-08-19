import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { setNavigator } from "../utils/navigation";

// Mounted once inside <BrowserRouter> so modules outside the React tree
// (e.g. api/axios.js) can still navigate the SPA. Renders nothing.
const NavigationSetter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
};

export default NavigationSetter;
