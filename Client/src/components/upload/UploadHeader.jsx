import { FaCloudUploadAlt } from "react-icons/fa";

const UploadHeader = () => {
  return (
    <section className="text-center mb-14">

      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-6">
        <FaCloudUploadAlt className="text-5xl text-orange-500" />
      </div>

      <h1 className="text-5xl font-bold text-gray-900">
        Upload Arrangement
      </h1>

      <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
        Share your guitar notation, PDF, and audio with musicians around
        the world.
      </p>

    </section>
  );
};

export default UploadHeader;