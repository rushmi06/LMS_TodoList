import React, { useEffect, useState } from 'react';
import Item from './components/Item';
import Navbar from './components/Navbar';
import { MdAdd } from "react-icons/md";
import Popup from './components/Popup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
function App() {
  const [isPopup, setIsPopup] = useState(false);
  const [lastUpdate,setLastUpdate] = useState("");
  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3002/items').then((result) => {
      setData(result.data);
      console.log(data)
    })
  },[lastUpdate]);
  const closePopup = (status) => {
    if(status===true){
      setLastUpdate("added");
      const notify = () => toast.success("Saved Successfully");
      notify();
    }else if(status === false){
      const notify = () => toast.error("Error while posting");
      notify();
    }
    setIsPopup(false);
  };
  const deletedItem = (status)=>{
    if(status===true){
      setLastUpdate("deleted");
      const notify = () => toast.success("Deleted Successfully");
      notify();
    }else if(status === false){
      const notify = () => toast.error("Error while deleting");
      notify();
    }
  }

  const edited= ()=>{
    setLastUpdate("edited");
  }

  return (
    <div className='w-full h-[100vh] relative overflow-scroll'>
      <Navbar />
      {data.map((item,index)=><Item item={item} key={index} deletedItem={deletedItem} edited = {edited}/>)}
      {isPopup && <Popup onClose={closePopup}/>}
      <div onClick={() => setIsPopup(true)} className='fixed bottom-10 right-10 text-4xl font-bold bg-orange-400 p-2 rounded-full shadow-xl hover:cursor-pointer'>
        <MdAdd />
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>

    </div>
  );
}

export default App;
