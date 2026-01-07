import { create } from "zustand";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  
    (set, get) => ({
      stage: 1,

      setStage: (value) => {
        set(()=>{return { stage: value }});
      },
    })
   
  )
;

export default useLoginStore;
