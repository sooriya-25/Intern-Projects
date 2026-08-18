import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { FloatingWidgetProvider } from "./context/FloatingWidgetContext";
import FloatingWidget from "./components/FloatingWidget/FloatingWidget";
import { ToastProvider } from "./components/Toast/ToastProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <FloatingWidgetProvider>
          <AppRoutes />
          <FloatingWidget />
        </FloatingWidgetProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
