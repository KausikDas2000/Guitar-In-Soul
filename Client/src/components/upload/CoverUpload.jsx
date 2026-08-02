import { useRef } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";

const CoverUpload = ({ coverImage, setCoverImage }) => {
  const fileInputRef = useRef();

  const handleSelect = (e) => {
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setCoverImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        Cover Image
      </h2>

      <div
        onClick={() => fileInputRef.current.click()}
        className="relative cursor-pointer border-2 border-dashed border-orange-300 hover:border-orange-500 transition rounded-3xl overflow-hidden bg-gray-50 h-[420px] flex items-center justify-center group"
      >

        {!coverImage ? (
          <div className="text-center">

            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition">

              <FaCamera className="text-4xl text-orange-500" />

            </div>

            <h3 className="text-xl font-semibold mb-2">
              Upload Cover
            </h3>

            <p className="text-gray-500">
              Click to browse
            </p>

            <p className="text-gray-400 text-sm mt-2">
              PNG • JPG • WEBP
            </p>

          </div>
        ) : (
          <img
            src={URL.createObjectURL(coverImage)}
            alt="cover preview"
            className="w-full h-full object-cover"
          />
        )}

      </div>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleSelect}
      />

      {coverImage && (
        <div className="flex justify-between items-center mt-5">

          <span className="text-gray-600 truncate">
            {coverImage.name}
          </span>

          <button
            type="button"
            onClick={removeImage}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            <FaTrash />
            Remove
          </button>

        </div>
      )}
    </div>
  );
};

export default CoverUpload;