import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
    //niche line da tlb hai k localstorage ch j oh paste hai availabe tn oh data getitem krk parse krlo if not availble  the emoty array show
  pastes:localStorage.getItem("pastes") //pastes ethe key hai 
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
  
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState, //`state` will now refer to `initialState`

  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;
      //eh khud add krna k j already paste hai tn na hoe
      state.pastes.push(paste);//jdo vi asi cheeja update krde a oh initalSTate ch nhi horia directly update eh bs temproty state bndia ne redux ch ohtn sadi localSTorage ch save hon karn tn data presistent rehreha 
      localStorage.setItem("pastes",JSON.stringify(state.pastes)); //pasets key hai te state.pastes value
      toast.success("Paste Created Successfully") 
    },
    updateToPastes: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>item._id ===paste._id);

      if(index>=0)
      {
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated");//ehde nl green tik ayega
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes:(state,action)=>{
        const pasteId=action.payload;
      const index=state.pastes.findIndex((item)=>item._id ===pasteId);

      if(index>=0)
      {
        state.pastes.splice(index,1);//splice(startIndex, deleteCount)
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer