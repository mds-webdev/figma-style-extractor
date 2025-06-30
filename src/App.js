import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FigmaCompanion from "./pages/FigmaCompanion";
import AppLayout from "./components/AppLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AppLayout>
                            <Home />
                        </AppLayout>
                    }
                />
                <Route
                    path="/figma"
                    element={
                        <AppLayout>
                            <FigmaCompanion />
                        </AppLayout>
                    }
                />
              
            </Routes>
        </BrowserRouter>
    );
}

export default App;
