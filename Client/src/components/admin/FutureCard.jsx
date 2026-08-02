const FeatureCard = ({ title, song }) => {
  if (!song) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-6">{title}</h2>

        <div className="h-56 w-full rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500">
          No arrangements available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <img
        src={song.coverImage?.url}
        alt={song.title}
        className="rounded-2xl h-56 w-full object-cover"
      />

      <h3 className="text-2xl font-bold mt-5">{song.title}</h3>

      <p className="text-zinc-500">{song.artist}</p>
    </div>
  );
};

export default FeatureCard;