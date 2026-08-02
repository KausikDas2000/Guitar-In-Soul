import { useState } from "react";
import Navbar from "../components/Navbar";

import UploadHeader from "../components/upload/UploadHeader";
import SongInfoForm from "../components/upload/SongInfoForm";
import CoverUpload from "../components/upload/CoverUpload";
import PdfUpload from "../components/upload/PdfUpload";
import AudioUpload from "../components/upload/AudioUpload";
import DescriptionBox from "../components/upload/DescriptionBox";
import UploadButton from "../components/upload/UploadButton";
import SuccessModal from "../components/SuccessModal";

import { uploadSong } from "../services/songService";

const Upload = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    difficulty: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [notationPdf, setNotationPdf] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      artist: "",
      genre: "",
      difficulty: "",
      description: "",
    });

    setCoverImage(null);
    setNotationPdf(null);
    setAudioFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !notationPdf || !audioFile) {
      return alert("Please upload Cover Image, PDF and Audio.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("artist", form.artist);
      formData.append("genre", form.genre);
      formData.append("difficulty", form.difficulty);
      formData.append("description", form.description);

      formData.append("coverImage", coverImage);
      formData.append("notationPdf", notationPdf);
      formData.append("audioFile", audioFile);

      const res = await uploadSong(formData);

      // alert(res.data.message);
      setSuccess(true);

      resetForm();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal

        isOpen={success}

        onClose={() => setSuccess(false)}

        title="Upload Complete!"

        message="Your guitar arrangement is now available for the community."

      />
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 py-16">

        <div className="max-w-6xl mx-auto px-6">

          <UploadHeader />

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            {/* Cover + Song Info */}
            <div className="grid lg:grid-cols-2 gap-10">

              <CoverUpload
                coverImage={coverImage}
                setCoverImage={setCoverImage}
              />

              <SongInfoForm
                form={form}
                handleChange={handleChange}
              />

            </div>

            {/* PDF Upload */}
            <PdfUpload
              notationPdf={notationPdf}
              setNotationPdf={setNotationPdf}
            />

            {/* Audio Upload */}
            <AudioUpload
              audioFile={audioFile}
              setAudioFile={setAudioFile}
            />

            {/* Description */}
            <DescriptionBox
              form={form}
              handleChange={handleChange}
            />

            {/* Upload Button */}
            <UploadButton
              loading={loading}
            />

          </form>

        </div>

      </main>
    </>
  );
};

export default Upload;