import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Upload from "./pages/Upload";
import Song from "./pages/Song";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Arrangements from "./pages/Arrangement";
import Footer from "./pages/Footer";
import Favorites from "./pages/Favorites";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Arrangementss from "./pages/admin/Arrangements";
import Analytics from "./pages/admin/Analytics";
import EditArrangement from "./pages/admin/EditArrangement";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Contact from "./pages/Contact";
import Messages from "./pages/admin/Messages";
import Requests from "./pages/admin/Requests";
import RequestSong from "./pages/RequestSong";
import RequestedSongs from "./pages/RequestedSong";
import About from "./pages/About";
import CookieBanner from "./components/CookieBanner";
import CookiePolicy from "./pages/CookiePolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Notifications from "./pages/Notification";


function App() {
  return (
    <BrowserRouter>
    <CookieBanner/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route path="/upload" element={<Upload />} />
        <Route path="/arrangements" element={<Arrangements />} />
        <Route path="/footer" element={<Footer />} />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route path="/song/:id" element={<Song />} />

        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<NotFound />} />


        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="messages" element={<Messages />} />
          

          <Route path="arrangements" element={<Arrangementss />} />
          <Route path="arrangements/edit/:id" element={<EditArrangement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="requests" element={<Requests />} />
        </Route>
        <Route path="/request-song" element={<RequestSong />} />

        <Route path="/requested-songs" element={<RequestedSongs />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cookie-policy"
          element={<CookiePolicy />}
        />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;