import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { FloatingWidgetProvider } from "./context/FloatingWidgetContext";
import FloatingWidget from "./components/FloatingWidget/FloatingWidget";

function App() {
  return (
    <BrowserRouter>
      <FloatingWidgetProvider>
        <AppRoutes />
        <FloatingWidget />
      </FloatingWidgetProvider>
    </BrowserRouter>
  );
}

export default App;
