import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Abourt from './pages/Abourt.jsx';
import Contact from './pages/Contact.jsx';
import NewPost from './pages/NewPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import AuthContexProvider from './AuthContex.jsx';
import Posts from './pages/Posts.jsx';
import PostDetail from './pages/PostDetail.jsx';

const routerProvider = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Posts />,
			},
			{
				path: "/about",
				element: <Abourt />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		
			{
				path: "/newPost",
				element:   <NewPost />,
			},
			{
				path: "/updated_post/:id",
				element: <EditPost />,
			},
      {
				path: "/login",
				element: <Login />,
			},
      {
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/post/:id",
				element: <PostDetail />,
			},

			
		],
	},
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
	<AuthContexProvider>
	<RouterProvider router={routerProvider} />
	</AuthContexProvider>

  </StrictMode>,
)
