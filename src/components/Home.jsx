import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allpastes=useSelector((state)=> state.paste.pastes);

  function createPaste() {
    //ethe paste creta kreha a
    const paste={
        title: title,
        content: value,
        _id : pasteId || Date.now().toString(36), //agar pasteid hai already to vahi ajegi if not then new ajegi date nl bnai a jo
        createdAt: new Date().toISOString(),
    }
    //storing data at local
    if(pasteId)
    {
        //update kro agr pasteId hai
        dispatch(updateToPastes(paste));
    }
    else{
        //create ---> je pasteif hini hai ehds mtlb creat ekrn aye a te create da logic reducer ch likhake te dispatch oh dispatcher de ttrouhh hunda
        dispatch(addToPastes(paste));
    }

    //after creatipn pr updation 
    setTitle('');
    setValue('');
    setSearchParams({});

  }
  //ethe asi oh lijhre haan k gone page te ki dikhe jdo pasteid bdldi a
  useEffect(() => {
    if(pasteId)
    {
      //find returns the first matching element
      const paste= allpastes.find((p)=>p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  
    
    
  }, [pasteId])
  
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[65%] pl-5"
          type="text"
          placeholder="enter value here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl min-w-[500px] mt-4 p-4 focus:border-purple-400 focus:border focus:outline-none"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          
        />
      </div>
    </div>
  );
};

export default Home;
