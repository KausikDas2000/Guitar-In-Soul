const FeatureCard=({title,song})=>(

<div className="bg-zinc-900 rounded-3xl p-6">

<h2 className="text-xl font-bold mb-6">

{title}

</h2>

<img
src={song.coverImage?.url}
className="rounded-2xl h-56 w-full object-cover"
/>

<h3 className="text-2xl font-bold mt-5">

{song.title}

</h3>

<p className="text-zinc-500">

{song.artist}

</p>

</div>

)

export default FeatureCard;