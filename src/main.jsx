import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { AuthLayout } from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

import { Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element = {<App />}>
//       <Route path='/home'>        
//           <Home />
//       </Route>

//       <Route path='/login'>
//         <AuthLayout authentication={false}>
//           <Login />
//         </AuthLayout>
//       </Route>

//       <Route path='/signup'>
//         <AuthLayout authentication={false}>
//           <Signup />
//         </AuthLayout>
//       </Route>

//       <Route path='/explore'>
//         <AuthLayout authentication>
//           <AllPosts />
//         </AuthLayout>
//       </Route>

//       <Route path='/addpost'>
//         <AuthLayout authentication>
//           <AddPost />
//         </AuthLayout>
//       </Route>

//       <Route path='/editpost'>
//         <AuthLayout authentication>
//           <EditPost />
//         </AuthLayout>
//       </Route>

//       <Route path='/post/:slug'>
//         <Post />
//       </Route>


//     </Route>
//   )
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
