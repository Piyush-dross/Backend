// import { useState } from 'react'
import { AuthProvider } from './features/auth/auth.context'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import './features/shared/global.scss'
import { PostContextProvider } from './features/auth/post/post.context'
function App() {


  return (
    <>
      <AuthProvider>
        <PostContextProvider>
        <RouterProvider router={router}/>
        </PostContextProvider> 
      </AuthProvider>
    </>
  )
}

export default App
