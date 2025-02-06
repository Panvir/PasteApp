import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const [searchterm, setSearchterm] = useState("");

  //sate nu fetch kran lyi asi use krde hunde haan useSelector hook
  const pastes = useSelector((state) => state.paste.pastes); //paste staet hai te pastes value hai
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchterm}
        onChange={(e) => setSearchterm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border " key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>view</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button>SHare</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
