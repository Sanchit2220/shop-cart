import React, { useState } from "react";


const AddProduct = () =>{

    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error,setError] = React.useState(false);
 const addProduct = async ()=>{
      if(!name || !price || !category  || !company){
        setError(true);
        return false;
      }


    console.log(name,category,price,company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5000/add-product",{
        method : 'post',
        body : JSON.stringify({name,price,category,company,userId}),
        headers :{
            "content-type" : "application/json"
        }

    });
    result = await  result.json();
    console.log(result);
    
 }

return(
<div className="product">
<input type="text" className="inputBox" placeholder="Enter Name" value={name} onChange={(e)=> {setName(e.target.value)}} />
 { error && !name &&       <span className="invalid-inp">Enter valid name</span>}

<input  type="text" className="inputBox" placeholder="Enter price" value={price} onChange={(e)=> {setPrice(e.target.value)}} />
{ error && !price &&  <span className="invalid-inp">Enter valid price</span>}

<input type="text" className="inputBox" placeholder="Enter Name" value={category} onChange={(e)=> {setCategory(e.target.value)}} />
{ error && !category &&  <span className="invalid-inp">Enter valid category</span>}

<input type="text" className="inputBox" placeholder="Enter Name" value={company} onChange={(e)=> {setCompany(e.target.value)}} />
{ error && !company &&  <span className="invalid-inp">Enter valid Company</span>}

<button className="addproduct" onClick={addProduct}>Add product</button>
</div>
)




}
export default AddProduct