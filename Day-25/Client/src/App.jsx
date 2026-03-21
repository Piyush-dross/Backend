import { RouterProvider } from "react-router";
import { router } from "./Features/app.routes";
import "./Features/Expression/styles/Button.scss";
import { AuthProvider } from "./Features/auth/auth.context";
import { SongContextProvider } from "./Features/Homes/song.context";
import "./Features/shared/styles/global.scss";

function App() {
    return (
        <AuthProvider>
            <SongContextProvider>
                <RouterProvider router={router} />
            </SongContextProvider>
        </AuthProvider>
    );
}

export default App;
