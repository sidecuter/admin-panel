import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router';

import SignIn from './pages/SignIn.tsx'
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import Users from "./pages/Users.tsx"
import {AuthProvider} from "./contexts/AuthContext.tsx";

export default function App() {
    return (
        <AuthProvider>
            <CssVarsProvider disableTransitionOnChange defaultColorScheme={'dark'}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<SignIn />}/>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />}></Route>
                            <Route path="users">
                                <Route index element={<Users />} />
                                <Route path=":id" element={<Profile />} />
                            </Route>
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CssVarsProvider>
        </AuthProvider>
    );
}