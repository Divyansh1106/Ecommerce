import {create} from "zustand"
import {persist} from "zustand/middleware"
const useUserStore=create(persist((set,get)=>({
    user:null,
    isAuthenticated:false,
    
    setUser:(user)=>{
        if(user)set({user,isAuthenticated:true});
        
    },

    removeUser:()=>{
       set({user:null,isAuthenticated:false});
    }








}),
{
    name:"userStore"
}

))
export default useUserStore;


