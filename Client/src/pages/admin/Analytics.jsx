import { useEffect,useState } from "react";
import {
FaUsers,
FaMusic,
FaHeart,
FaDownload,
FaEye,
FaStar
} from "react-icons/fa";

import { getAnalytics } from "../../services/adminService";
import Card from "../../components/admin/Card";
import FeatureCard from "../../components/admin/FutureCard";

const Analytics=()=>{

const [stats,setStats]=useState(null);

useEffect(()=>{

load();

},[]);

const load=async()=>{

const data=await getAnalytics();

setStats(data);

}

if(!stats)return<h1>Loading...</h1>

return(

<div>

<h1 className="text-5xl font-black mb-10">

Analytics

</h1>

<div className="grid lg:grid-cols-3 gap-8">

<Card
icon={<FaUsers/>}
title="Users"
value={stats.totalUsers}
/>

<Card
icon={<FaMusic/>}
title="Arrangements"
value={stats.totalArrangements}
/>

<Card
icon={<FaHeart/>}
title="Likes"
value={stats.totalLikes}
/>

<Card
icon={<FaStar/>}
title="Favorites"
value={stats.totalFavorites}
/>

<Card
icon={<FaEye/>}
title="Views"
value={stats.totalViews}
/>

<Card
icon={<FaDownload/>}
title="Downloads"
value={stats.totalDownloads}
/>

</div>

<div className="grid md:grid-cols-3 gap-8 mt-12">

<FeatureCard
title="Most Liked"
song={stats.mostLiked}
/>

<FeatureCard
title="Most Viewed"
song={stats.mostViewed}
/>

<FeatureCard
title="Most Downloaded"
song={stats.mostDownloaded}
/>

</div>

</div>

)

}

export default Analytics;