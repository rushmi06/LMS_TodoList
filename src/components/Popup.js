import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios'
function Popup({ onClose ,id}) {
    const [title,setTitle] = useState(null);
    const [description,setDescription] = useState(null);
    useEffect(()=>{
      if(id){
        axios.get('http://localhost:3002/item/'+id).then((result) => {
          setTitle(result.data.title);
          setDescription(result.data.description);
        }).catch((err) => {
          
        });
      }
    },[]);
    const addItem = ()=>{
        if(title && description){
            axios.post('http://localhost:3002/item',{title:title,description:description}).then((result) => {
                onClose(true);
            }).catch((err) => {
                onClose(false); 
            });
        }
    }
    const editItem = ()=>{
        if(title && description){
            axios.put('http://localhost:3002/item/'+id,{title:title,description:description}).then((result) => {
                onClose(true);
            }).catch((err) => {
                onClose(false);
            });
        }
    }
  return (
    <div className=' z-10 bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 h-[100vh] w-full flex justify-center items-center'>
      <div className='bg-white flex flex-col gap-3 border p-10'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-bold'>Add Item</div>
          <div onClick={onClose} className='w-fit hover:bg-red-300 p-1 rounded-full hover:text-white'>
            <RxCross1 />
          </div>
        </div>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='border p-2 w-[500px]' placeholder='Enter title' />
        <textarea rows={6} type='text' value={description} onChange={(e)=>setDescription(e.target.value)} className='border p-2 w-[500px]' placeholder='Enter description' />
        <div className='flex justify-between'>
          <div onClick={onClose} className='bg-gray-500 p-2 font-bold w-1/3 text-center hover:cursor-pointer'>Cancel</div>
          {!id && <div onClick={addItem} className='bg-orange-500 p-2 font-bold w-1/3 text-center hover:cursor-pointer'>Add</div>}
          {id && <div onClick={editItem} className='bg-orange-500 p-2 font-bold w-1/3 text-center hover:cursor-pointer'>Edit</div>}
        </div>
      </div>
    </div>
  );
}

export default Popup;
