
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const {id}=useParams();
  const allpastes=useSelector((state)=>state.paste.pastes);
  const paste=allpastes.filter((p)=>p._id ===id)[0];//0 tn krk kyoki array ari c te ohnu access krn lyi 0th index
  
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[65%] pl-5"
          type="text"
          value={paste.title}
          disabled
          
        />

        
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl min-w-[500px] mt-4 p-4"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
