const Card=({icon,title,value})=>(

<div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

<div className="text-orange-500 text-4xl mb-5">

{icon}

</div>

<h2 className="text-5xl font-black">

{value}

</h2>

<p className="text-zinc-400 mt-2">

{title}

</p>

</div>

)

export default Card;