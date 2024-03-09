import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
// import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from 'axios';
import Popup from './Popup';
// import { ToastContainer, toast } from 'react-toastify';
function Item(props) {
    const [isPopup, setIsPopup] = useState(false);
    const [isHover,setIsHover] = useState(false);
    const closePopup = (status) => {
        setIsPopup(false);
        setIsHover(false);
      };
    const edit = ()=>{
        setIsPopup(true);
        setIsHover(false);
    }
    const del = ()=>{
        axios.delete('http://localhost:3002/item/'+props.item._id).then((result) => {
            // console.log(result)
            props.deletedItem(true);
        }).catch((err) => {
            props.deletedItem(false);  
            console.log(err)  
        });
        setIsHover(false);
    }
  return (
    <div className='relative'>
        
        <div className='relative flex  h-[15vh] items-center justify-between w-2/3 border-2 shadow-lg pl-6  rounded-lg mx-auto my-4'>
            <div className='flex flex-col py-2'>
                <div className='font-bold text-2xl text-orange-500'>{props.item.title}</div>
                <div className='font-thin text-md'>{props.item.description}</div>
            </div>
            <div className='h-full bg-orange-400  w-2/12 rounded-tr-lg rounded-br-lg flex  justify-center items-center gap'>
                <div onClick={()=>setIsHover(!isHover)} className=' w-fit hover:cursor-pointer hover:bg-gray-200 p-2 rounded-full flex justify-center items-center '>
                    {!isHover && <FaPlay/>}
                    {isHover && <FaPause/>}
                </div>
                {isHover && <div className='absolute right-0 flex flex-col gap-1 '>
                    
                    <div onClick={edit} className='text-2xl w-fit hover:cursor-pointer hover:bg-gray-200 p-2 rounded-full flex justify-center items-center '>
                        <MdEditSquare />
                    </div>
                    <div onClick={del} className='text-2xl w-fit hover:cursor-pointer hover:bg-gray-200 p-2 rounded-full flex justify-center items-center '>
                        <IoTrashBinSharp />
                    </div>
                </div>}
            </div>
        </div>
        {isPopup && <Popup onClose={closePopup} id = {props.item._id}/>}
    </div>
  )
}

export default Item