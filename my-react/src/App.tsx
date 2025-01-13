import './App.css'
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import RegisterForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
