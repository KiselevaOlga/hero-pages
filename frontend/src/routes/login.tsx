import axios from "axios"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useEffect, useState } from "react"
import { User } from "../App"

interface LoginPageProps {
    onLogin: (loginValues: User) => Promise<void>;
  }
export const Login = ( {onLogin}: LoginPageProps): JSX.Element =>{
    const [isActivated, setIsActivated] =  useState(false)
    return (
    <div>
    <h1>Login</h1>
    <div>
        <Formik 
    initialValues={{
        name: '',
        password: '',
    }}
    onSubmit={(values: User, {setSubmitting}: FormikHelpers<User>)=> {
        onLogin(values)
        setSubmitting(false)
    }  
    } 
    >
     <Form>
     <label htmlFor="name">Name</label>
    <Field id="name" name="name" placeholder="Type a name" />
    <label htmlFor="password">Password</label>
    <Field id="password" name="password" placeholder="*****" />
    <button type="submit">Submit</button>

     </Form>

 </Formik>

    </div>
    
    </div>
    )
}