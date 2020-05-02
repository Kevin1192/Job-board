import React, { useReducer, useEffect } from 'react'

import './Input.css'
import {validate} from '../../util/validators'

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators) 
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = props => {
    
    const {id, label, type, rows, placeholder, error, onInput} = props
    
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', 
        isValid: props.initialValid || false,
        isTouched: false
    })

    const {value, isValid} = inputState

    useEffect(() => {
        onInput(id, value, isValid)}, [id, value, isValid, onInput])

    const handleChange = event => {
        dispatch({
            type: 'CHANGE', 
            val: event.target.value, 
            validators: props.validators
        })
    }

    const handleBlur = () => {
        dispatch({type: 'TOUCH'})
    }


    const element = props.element === 'input' ? 
    (<input 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputState.value}
    />) 
    : (<textarea 
        id={id} 
        rows={rows || 3} 
        onChange={handleChange}
        onBlur={handleBlur}
        value={inputState.value}
    />)




    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label} </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{error}</p>}
        </div>
    )
}

export default Input