import Navbar from "../components/Navbar";

import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileStats from "../components/profile/ProfileStats";
import MyUploads from "../components/profile/MyUploads";
import EditProfileModal from "../components/profile/EditProfileModal";

import { useEffect, useState } from "react";
import API from "../api/axios";


const Profile = () => {

  const [showEditModal, setShowEditModal] = useState(false);

  const [profile, setProfile] = useState(null);


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });


        setProfile({
          ...res.data.user,
          profileImage: res.data.user.profileImage?.url || "",
        });


        // keep localStorage updated
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );


      } catch (error) {

        console.log(
          error.response?.data || error.message
        );

      }

    };


    fetchProfile();

  }, []);


  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }


  return (
    <>
      <Navbar />


      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-orange-50 pb-20">


        <ProfileBanner 
          profile={profile}
          setProfile={setProfile}
        />


        <div className="max-w-7xl mx-auto px-6">


          <ProfileInfo
            profile={profile}
            setShowEditModal={setShowEditModal}
          />


          <EditProfileModal
            open={showEditModal}
            setOpen={setShowEditModal}
            profile={profile}
            setProfile={setProfile}
          />


          <ProfileStats />


          <MyUploads />


        </div>


      </main>
    </>
  );
};


export default Profile;