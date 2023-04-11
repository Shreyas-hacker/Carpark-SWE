import { createContext,useReducer } from "react";

export const FavContext = createContext({
    fav: [],
    addFav: (carpark)=>{},
    removeFav: (carpark)=>{},
})

function favReducer(state,action){
    switch(action.type){
        case "ADD":
            console.log(action.payload)
            return [action.payload,...state];
        case "REMOVE":
            return state.filter((item)=>item!==action.payload);
        default:
            return state;
    }
}

function FavContextProvider({children}){
    const [favState,dispatch] = useReducer(favReducer,[]);

    function addFav(carpark){
        dispatch({type:"ADD",payload:carpark});
    }

    function removeFav(carpark){
        dispatch({type:"REMOVE",payload:carpark});
    }
    
    const value = {
        fav: favState,
        addFav: addFav,
        removeFav: removeFav
    }

    return <FavContext.Provider value={value}>{children}</FavContext.Provider>
}

export default FavContextProvider;