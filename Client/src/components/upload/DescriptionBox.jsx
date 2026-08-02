import { FaAlignLeft } from "react-icons/fa";

const DescriptionBox = ({ form, handleChange }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-6">

        <FaAlignLeft className="text-orange-500 text-2xl" />

        <h2 className="text-2xl font-bold">
          Description
        </h2>

      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={7}
        placeholder="Tell the community about this arrangement...

• Is it fingerstyle?
• Solo or rhythm?
• Capo required?
• Tuning?
• Tips for beginners..."
        className="w-full rounded-2xl border border-gray-300 p-5 resize-none outline-none focus:ring-2 focus:ring-orange-500 transition"
      />

      <div className="flex justify-end mt-3">

        <span className="text-sm text-gray-400">
          {form.description.length}/1000
        </span>

      </div>

    </div>
  );
};

export default DescriptionBox;