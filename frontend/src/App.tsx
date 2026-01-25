import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/home";
import AuthListener from "./hooks/AuthListener";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Loading from "./components/Loading";
import RoomDetails from "./pages/RoomDetails";
import RoomPage from "./pages/RoomPage";
import ContactPage from "./pages/ContactPage";


function App() {
  const {  isLoaded: clerkLoaded } = useUser();

  if (!clerkLoaded) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <AuthListener/>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/contact-us" element={<ContactPage/>} />
          <Route path="/rooms" element={<RoomPage/>} />
          <Route path="/rooms/:RoomName" element={<RoomDetails/>} />
          <Route path="/sign-in/*" element={<SignInPage/>} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
