import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"; // for url value get

const UpdateProduct = () =>{

    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate()
 const params = useParams();

 useEffect(()=>{
    console.log(params);
    getProductDetails();
 },[])


   const getProductDetails = async ()=>{
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
     setName(result.name);
     setPrice(result.price);
     setCategory(result.category);
     setCompany(result.company);    
   }

 const updateProduct = async ()=>{
     let result = await fetch(`http://localhost:5000/products/${params.id}`,{
       method : 'put',
       body : JSON.stringify({name,price,category,company}),
       headers:{
        'content-type' : 'application/json'
       }

    

     })
     result =await  result.json();
     navigate('/');
     console.log(result);
 
 }

return(
<div className="product">
    <h1>Update Product</h1>
<input type="text" className="inputBox" placeholder="Enter Name" value={name} onChange={(e)=> {setName(e.target.value)}} />
 { error && !name &&       <span className="invalid-inp">Enter valid name</span>}

<input  type="text" className="inputBox" placeholder="Enter price" value={price} onChange={(e)=> {setPrice(e.target.value)}} />
{ error && !price &&  <span className="invalid-inp">Enter valid price</span>}

<input type="text" className="inputBox" placeholder="Enter Name" value={category} onChange={(e)=> {setCategory(e.target.value)}} />
{ error && !category &&  <span className="invalid-inp">Enter valid category</span>}

<input type="text" className="inputBox" placeholder="Enter Name" value={company} onChange={(e)=> {setCompany(e.target.value)}} />
{ error && !company &&  <span className="invalid-inp">Enter valid Company</span>}

<button className="addproduct" onClick={updateProduct}>Update product</button>
</div>
)




}
export default UpdateProduct