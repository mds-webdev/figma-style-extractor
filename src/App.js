import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FigmaCompanion from "./pages/FigmaCompanion";
import WordPressWizard from "./pages/WordPressWizard";
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
                <Route
                    path="/subdomain-creator"
                    element={
                        <AppLayout>
                            <WordPressWizard />
                        </AppLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
