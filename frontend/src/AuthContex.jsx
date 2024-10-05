


import { createContext, useContext, useState } from 'react';

 export const AuthContext = createContext();



 const AuthContexProvider =({children}) => {




    const [user , setUser]  =  useState(null)
 





    return (
        <AuthContext.Provider value={{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )




 }




    export default AuthContexProvider;
 


    export const useAuth = () => {

        const contex = useContext(AuthContext)

        if(!contex){
            throw new Error('useAuth must be used within AuthContexProvider')
        }

        return contex

    }