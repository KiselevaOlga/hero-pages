import axios from "axios"
import { Formik, FormikHelpers, Form, Field } from "formik"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User } from "../App"

const data= [{id: 1, name: 'Peter' }, {id: 2, name: 'Anna'}]

export interface HeroResponse {
    id: number;
    name: string;
    shortDescription: string;
    description:  string;
    power: string;
    createdAt:  string;
    updatedAt:  string;
}
export interface CreateHero {
    name: string;
    shortDescription: string;
    description: string;
    power: string;
}

export const Heroes = ()=>{
    const [heroes, setHeroes] = useState<HeroResponse[] | [] >([])
    const getListOfHeroes = async () => {
        try{
            const response = await axios.get('/heroes')
            setHeroes(response.data)
        }catch(e){
            console.log('Error: ', e)
        }
    }

    const onAddNewHero = async (hero: CreateHero) => {
        return await axios.post('/heroes', {...hero}).then(res => console.log('res', res))
        
    }

    useEffect(()=>{
        getListOfHeroes()
        return ()=>{}
    },[heroes])
    return (
    <div>
        Heroes
        {heroes.map((item)=> <Link to={`${item.id}`} key={item.id}>{item.name}</Link>)}
        <div>
        <Formik 
            initialValues={{
                name: '',
                shortDescription: '',
                description: '',
                power: ''
            }}
            onSubmit={(values: CreateHero, {setSubmitting}: FormikHelpers<CreateHero>)=> {
                onAddNewHero(values)
                setSubmitting(false)
            }  
            } 
            >
            <Form>
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" placeholder="Type a name" />
                <label htmlFor="shortDescription">Short description</label>
                <Field id="shortDescription" name="shortDescription" placeholder="Create a short description" />
                <label htmlFor="description">description</label>
                <Field id="description" name="description" placeholder="Type a description" />
                <label htmlFor="power">power</label>
                <Field id="power" name="power" placeholder="Create a power" />
                <button type="submit">Submit</button>
            </Form>

        </Formik>

    </div>
    </div>
    )
}