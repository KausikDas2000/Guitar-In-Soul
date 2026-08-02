import {
  FaCheck,
  FaMusic,
  FaTimes
} from "react-icons/fa";

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your arrangement has been uploaded successfully."
}) => {

  if (!isOpen) return null;


  return (

    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      backdrop-blur-sm
      px-5
      "
    >

      {/* Modal */}

      <div
        className="
        relative
        w-full
        max-w-md
        bg-white
        rounded-[32px]
        shadow-2xl
        p-8
        text-center
        animate-[scale-in_0.3s_ease]
        "
      >


        {/* Close */}

        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          w-10
          h-10
          rounded-full
          bg-gray-100
          hover:bg-gray-200
          flex
          items-center
          justify-center
          transition
          "
        >

          <FaTimes />

        </button>


        {/* Icon */}

        <div
          className="
          mx-auto
          w-24
          h-24
          rounded-full
          bg-gradient-to-br
          from-orange-500
          to-orange-600
          flex
          items-center
          justify-center
          shadow-lg
          shadow-orange-300
          "
        >

          <div
            className="
            w-14
            h-14
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            "
          >

            <FaCheck
              className="
              text-orange-600
              text-3xl
              "
            />

          </div>

        </div>


        {/* Brand */}

        <div
          className="
          mt-6
          flex
          justify-center
          items-center
          gap-2
          text-orange-500
          "
        >

          <FaMusic />

          <span className="font-bold">
            Guitar In Soul
          </span>

        </div>


        {/* Content */}

        <h2
          className="
          text-3xl
          font-black
          text-gray-900
          mt-5
          "
        >
          {title}
        </h2>


        <p
          className="
          text-gray-500
          mt-3
          leading-7
          "
        >
          {message}
        </p>


        {/* Button */}

        <button
          onClick={onClose}
          className="
          mt-8
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          text-white
          font-bold
          hover:shadow-lg
          hover:scale-105
          transition-all
          "
        >

          Continue

        </button>


      </div>

    </div>

  );
};


export default SuccessModal;