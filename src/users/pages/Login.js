import React, {useState, useContext} from 'react'

import './Login.css'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Loader from '../../shared/components/UIElements/Loader'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hooks'
import { LoginContext } from '../../shared/context/login-context'
import { useHTTPClient } from '../../shared/hooks/http-hook'

const Login = () => {

    const auth = useContext(LoginContext)

    const [isLogin, setIsLogin] = useState(true)
    const { isLoading, error, sendRequest, clearError } = useHTTPClient()

    const [formState, handleInput, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const handleLoginSubmit = async event => {
        event.preventDefault()

        console.log(formState.inputs)

        if(isLogin){
            try {
                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/login`,
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { "Content-Type": "application/json"},
                )
                auth.login(data.userId, data.token)
            } catch (error){}
          
        } else {
            try {

                const formData = new FormData() //browser API
                formData.append('email', formState.inputs.email.value)
                formData.append('name', formState.inputs.name.value)
                formData.append('password', formState.inputs.password.value)
                formData.append('image', formState.inputs.image.value)

                const data = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
                    'POST',
                    formData //fetch API automatically adds headers
                )
                auth.login(data.userId, data.token)
            } catch (err) {}
        }
    }

    const showSignUp = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }

        setIsLogin(prev => !prev)
    }

 
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className ='authentication'>
                {isLoading && <Loader asOverlay/>}
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleLoginSubmit}>
                    {!isLogin && 
                        <Input 
                            id='name' 
                            element='input' 
                            type='text' 
                            label='Full Name' 
                            validators={[VALIDATOR_REQUIRE()]}
                            error = 'Please enter your full name.'
                            onInput = {handleInput} 
                        />
                    }
                    {!isLogin && <ImageUpload center id='image' onInput={handleInput} error='Please provide an image'/>}
                    <Input
                        id='email'
                        element = 'input'
                        type = 'email'
                        label = 'Email'
                        validators={[VALIDATOR_EMAIL()]}
                        error = 'Please enter a valid email address.'
                        onInput= {handleInput}
                    />
                    <Input
                        id='password'
                        element = 'input'
                        type = 'password'
                        label = 'Password'
                        validators={[VALIDATOR_MINLENGTH(7)]}
                        error = 'Please enter a valid password (min. length 7 characters).'
                        onInput= {handleInput}
                    />
                    <Button type='submit' disabled ={!formState.isValid}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>
                <Button inverse onClick={showSignUp}>{isLogin ? 'Sign Up' : 'Login'}</Button>
            </Card>
        </React.Fragment>
    )
}

export default Login