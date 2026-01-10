import {create} from "zustand"
import {persist} from "zustand/middleware"
const UseUserStore=create(persist((set,get)=>({
    user:{
        name:"",
        email:"",
        phone:"",
        password:"",
        addresses:[]

        
    },
    isAuthenticated:false,
    
    setUser:(data)=>{
        if(data)set((state)=>({user:{...state.user,...data},isAuthenticated:true}));

        
    },

    removeUser:()=>{
       set({user:{
        name:"",
        email:"",
        phone:"",
        password:"",
        addresses:[]

       },isAuthenticated:false});
    },
    addAddress:(address)=>{
       
    set((state) => ({
      user: {
        ...state.user,
        addresses: [...state.user.addresses, address]
      }
    }))
    },








}),
{
    name:"userStore"
}

))
export default UseUserStore;


