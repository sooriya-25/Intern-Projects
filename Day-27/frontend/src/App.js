import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import NavigationSetter from "./routes/NavigationSetter";
import { FloatingWidgetProvider } from "./context/FloatingWidgetContext";
import FloatingWidget from "./components/FloatingWidget/FloatingWidget";
import { ToastProvider } from "./components/Toast/ToastProvider";

function App() {
  return (
    <BrowserRouter>
      <NavigationSetter />
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
