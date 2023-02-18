import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// import all components
import UserName from "./components/UserName";
import Register from "./components/Register";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import NotFoundPage from "./components/NotFoundPage";

// auth middleware
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

// root routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserName />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/password',
        element: <ProtectRoute> <Password /> </ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser> <Profile /> </AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path: '*',
        element: <NotFoundPage />
    },
])

const App = () => {
    return (
        <main>
            <RouterProvider router={router}>

            </RouterProvider>
        </main>
    );
};

export default App;