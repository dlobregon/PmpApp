

import deviceStorage from './components/Common/MyStorage'
const ApiUrl = require("./app_config.json").host
//para la flatlist de las tareas
const PAGE_SIZE= 20;

export {ApiUrl}


export async function getHeaders()
{
    return deviceStorage.getItem("user_token")
    .then((token)=>{
        myHeaders = {
            headers:{
                'Authorization': 'Bearer ' + token,
                'Cache-Control': 'no-cache' , 
                'Content-Type': 'application/json'
            }
        }
        return myHeaders;
    });
    

}
