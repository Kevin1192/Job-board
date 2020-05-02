import React, {useRef, useState, useEffect} from 'react'

import './ImageUpload.css'
import Button from '../FormElements/Button'

const ImageUpload = props => {

    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const [isValid, setIsValid] = useState()

    const fileSelectorRef = useRef()

    useEffect(() => {
        if (!file){return}

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreview(fileReader.result)
        }
        fileReader.readAsDataURL(file)


    }, [file])

    const handleSelect = event => {
        
        let selectedFile
        let fileIsValid = isValid
        if(event.target.files && event.target.files.length === 1){
            selectedFile = event.target.files[0]
            setFile(selectedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, selectedFile, fileIsValid)

    }

    const handleUploadImage = () => {
        fileSelectorRef.current.click()
    }

    return (
        <div className='form-control'>
            <input 
                id={props.id} 
                ref={fileSelectorRef}
                style={{display: 'none'}} 
                type='file' 
                accept='.jpeg, .jpg, .png'
                onChange={handleSelect}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    {preview && <img src={preview} alt='Preview'/>}
                    {!preview && <p>Please upload an image.</p>}
                </div>
                <Button type='button' onClick={handleUploadImage}>Upload Image</Button>
            </div>
            {!isValid && props.error}
        </div>
    )
}

export default ImageUpload