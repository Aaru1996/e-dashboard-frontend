import { Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Toast = ({props}) =>{
    const toast = useToast();

    const hanldeClick=async()=>{
        await props.handleLogin();
        console.log(props)
        if(!props.error){
           
           toast({
             title:props.toastMessage,
             position: 'top-right',
            //  description: "We've created your account for you.",
             status: 'success',
             duration: 3000,
             isClosable: true,

           })
        }
    }

    return (
        <Button onClick={hanldeClick} >{props.buttonValue}</Button>
    )
}


export default Toast;