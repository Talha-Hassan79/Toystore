import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import productsData from "../data/products";
import { useCart } from "../context/CartContext";

const Product = () => {
const { id } = useParams();

const [product,setProduct]=useState(null);
const [qty,setQty]=useState(1);

const { addToCart } = useCart();

useEffect(()=>{
const found=productsData.find(
(p)=>String(p._id)===String(id)
);

setProduct(found || null);

},[id]);


if(!product){
return(
<div className="py-32 text-center text-gray-500">
Product not found
</div>
);
}


const addItem=()=>{
for(let i=0;i<qty;i++){
addToCart(product);
}
toast.success("Added to cart 🛒");
};

const related=
productsData
.filter(p=>p._id!==product._id)
.slice(0,4);


return(
<div className="bg-slate-50 min-h-screen">

<div className="max-w-7xl mx-auto px-6 py-10">


{/* BREADCRUMB */}
<div className="text-sm text-gray-500 mb-8">
<Link to="/">Home</Link>
<span className="mx-2">/</span>
<span>Toys</span>
<span className="mx-2">/</span>
<span className="text-gray-700 font-medium">
{product.name}
</span>
</div>



<div className="grid lg:grid-cols-2 gap-14 items-start">


{/* LEFT GALLERY */}
<div>

<motion.div
whileHover={{scale:1.02}}
className="
bg-white
rounded-[36px]
overflow-hidden
shadow-lg
border
"
>

<img
src={product.image}
alt={product.name}
className="
w-full
h-[540px]
object-cover
"
/>

</motion.div>


<div className="grid grid-cols-4 gap-4 mt-5">
{[1,2,3,4].map((i)=>(
<div
key={i}
className="
rounded-2xl
overflow-hidden
border
bg-white
shadow-sm
"
>
<img
src={product.image}
alt=""
className="h-24 w-full object-cover"
/>
</div>
))}
</div>

</div>



{/* RIGHT BUY BOX */}
<div
className="
bg-white
rounded-[38px]
shadow-xl
border
p-10
sticky
top-24
"
>

<span className="
inline-block
bg-indigo-100
text-indigo-700
px-4 py-2
rounded-full
font-semibold text-sm
mb-5
">
Best Seller
</span>


<h1 className="text-5xl font-black leading-tight">
{product.name}
</h1>


<div className="flex items-center gap-4 mt-5">
<div className="text-yellow-500">
★★★★★
</div>

<span className="text-gray-500">
(124 Reviews)
</span>
</div>



<div className="flex items-end gap-4 mt-7">
<div className="text-4xl font-black text-indigo-600">
${product.price}
</div>

<div className="line-through text-gray-400 text-xl">
${(product.price*1.2).toFixed(0)}
</div>
</div>



<p className="mt-7 text-gray-600 leading-7">
Premium educational toy made with safe materials,
designed to boost creativity, problem solving and fun.
</p>



<div className="space-y-4 mt-8">
<div>✔ Child Safe Materials</div>
<div>✔ STEM Learning Focus</div>
<div>✔ Fast Shipping</div>
<div>✔ 30 Day Returns</div>
</div>



{/* QTY */}
<div className="mt-10">
<p className="font-semibold mb-4">
Quantity
</p>

<div className="flex items-center gap-4">

<button
onClick={()=>setQty(
Math.max(1,qty-1)
)}
className="
w-11 h-11
rounded-xl
border
"
>
−
</button>

<span className="font-bold text-lg">
{qty}
</span>

<button
onClick={()=>setQty(qty+1)}
className="
w-11 h-11
rounded-xl
border
"
>
+
</button>

</div>

</div>



<div className="space-y-4 mt-10">

<button
onClick={addItem}
className="
w-full
bg-indigo-600
text-white
py-4
rounded-2xl
font-bold
hover:bg-indigo-700
transition
"
>
Add To Cart
</button>


<button
className="
w-full
bg-slate-900
text-white
py-4
rounded-2xl
font-bold
"
>
Buy Now
</button>

</div>

</div>

</div>




{/* DESCRIPTION + REVIEWS */}
<section className="mt-24">

<div className="grid md:grid-cols-2 gap-12">

<div className="
bg-white
rounded-[34px]
p-10
shadow
border
">
<h2 className="text-3xl font-bold mb-6">
Product Details
</h2>

<p className="text-gray-600 leading-8">
This toy promotes imagination,
fine motor skills and problem solving.
Perfect for home learning and gifting.
</p>

</div>



<div className="
bg-white
rounded-[34px]
p-10
shadow
border
">

<h2 className="text-3xl font-bold mb-6">
Customer Reviews
</h2>

<div className="space-y-5">
<p>⭐️⭐️⭐️⭐️⭐️ Amazing quality.</p>
<p>⭐️⭐️⭐️⭐️ My kid loves it.</p>
<p>⭐️⭐️⭐️⭐️⭐️ Worth every dollar.</p>
</div>

</div>

</div>

</section>




{/* RELATED */}
<section className="mt-24">

<h2 className="text-4xl font-black mb-10">
Related Products
</h2>

<div className="grid md:grid-cols-4 gap-8">

{related.map((p)=>(
<Link
to={`/product/${p._id}`}
key={p._id}
className="
bg-white
rounded-[30px]
overflow-hidden
border
shadow
hover:-translate-y-1
transition
"
>

<img
src={p.image}
className="
h-56
w-full
object-cover
"
/>

<div className="p-6">
<h3 className="font-bold">
{p.name}
</h3>

<p className="text-indigo-600 font-bold mt-2">
${p.price}
</p>
</div>

</Link>
))}

</div>

</section>


</div>
</div>
);
};

export default Product;