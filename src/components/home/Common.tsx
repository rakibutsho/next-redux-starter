import React from 'react'
import { MyFormFile, MyFormInputText, MyFormWrapper } from '../common/form'
import { Button } from '../ui/button';

function Common() {
    const handleSubmit = (data: any) => {
        console.log("Submit", data);
    }
    return (
        <div>
            <MyFormWrapper onSubmit={handleSubmit} defaultValues={{ email: "", fullName: "" }}>
                <MyFormInputText name='fullName' label='Full Name' required />
                <MyFormInputText
                    name='email'
                    label='Email'
                    required
                    rules={{
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address format"
                        }
                    }}
                />
                <div className='mb-3 max-w-xs'>
                    <MyFormFile name='file' label='File' required />
                </div>


                <Button type='submit'>
                    Submit
                </Button>
            </MyFormWrapper>
        </div>
    )
}

export default Common