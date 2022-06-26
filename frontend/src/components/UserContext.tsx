import axios from "axios";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserStored {
    id: number;
    name: string
}

interface ContextProps {
    user: UserStored | null;
    setUser: React.Dispatch<React.SetStateAction<UserStored | null>>;
    isLoading: boolean;
}

export const UserContext = createContext<ContextProps | null>(null);

export const useAuth = () =>{
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const [error, setError] = useState<null | string>(null);
    
    const setUserContext = async () => {
        return await axios.get('/users').then(res => {         
            context?.setUser(res.data[0]);  
            navigate('/heroes');                     
            }).catch((err) => {
            setError(err.response.data);
        })
    }
    const loginUser = async (data: { name: string; password: string; }) => {
        const { name, password } = data;
        return axios.post('/login', {
            name,
            password,
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            setError(err);
        })
    };
    
    return {
        loginUser,
        error,
    }
}


export const useFindUser =()=> {
    const [user, setUser] = useState<UserStored | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        const findUser = async ()=> {
        await axios.get('/users')
        .then(res => {
            setUser(res.data[0]);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
        }
        
        findUser();  
        return ()=>{}
    }, []);
    
    return {
        user,
        setUser,
        isLoading
    }
}