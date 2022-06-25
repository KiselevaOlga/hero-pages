import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeroResponse } from "./heroes";

export const Hero = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [hero, setHero] = useState<HeroResponse | undefined >(undefined)
    const getHero = async () => {
        try{
            const response = await axios.get(`/heroes/${params.id}`)
            setHero(response.data)
        }catch(e){
            console.log('Error: ', e)
        }
    }

    const onDeleteHero = async () => {
        return await axios.delete(`/heroes/${params.id}`).then(res => {
            if(res.data.length === 0){
                navigate('/heroes')
            }
        })
    }

    useEffect(()=>{
        getHero()
        return ()=>{}
    },[])
    return (
    <div>
        Individual hero {hero?.name}
        <button onClick={onDeleteHero}>Delete hero</button>
    </div>
    )
}