import {
  FaCloudUploadAlt,
  FaSpinner,
} from "react-icons/fa";

const UploadButton = ({ loading }) => {
  return (
    <div className="flex justify-center pt-6">

      <button
        type="submit"
        disabled={loading}
        className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-4"
      >

        {loading ? (
          <>
            <FaSpinner className="animate-spin text-xl" />
            Uploading...
          </>
        ) : (
          <>
            <FaCloudUploadAlt className="text-xl group-hover:-translate-y-1 transition" />
            Upload Arrangement
          </>
        )}

      </button>

    </div>
  );
};

export default UploadButton;