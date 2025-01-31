import './App.css'
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import RegisterForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Search from './pages/Search';
import GroupsListPage from './pages/Groups/GroupsList';
import CreateGroupPage from './pages/Groups/CreateGroup';
import EditGroupPage from './pages/Groups/EditGroup';
import GroupDetailsPage from './pages/Groups/GroupDetails';


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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="/groups">
                        <Route index element={<GroupsListPage />} />
                        <Route path="create" element={<CreateGroupPage />} />
                        <Route path="edit/:id" element={<EditGroupPage />} />
                        <Route path="details/:id" element={<GroupDetailsPage />} />
                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default App
