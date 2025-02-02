import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () =>{
    let data = JSON.parse(localStorage.getItem("user"))|| [];
    // console.log(data);
    // if(data) console.log('arun')
      return(
          <div>
             {data.name && data.email ? <Outlet/> : <Navigate to='/signup'/>}
          </div>
      )
}

export default PrivateComponent;

// which route we can to  protect just wrap that route inside this PrivateComponent
// after certain condition it will be shown