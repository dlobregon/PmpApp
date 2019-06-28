

import deviceStorage  from './components/Common/MyStorage'

const ApiUrl = "http://192.168.43.210:3000"
//para la flatlist de las tareas
const PAGE_SIZE= 20;

export {ApiUrl}


export async function getHeaders()
{
    return deviceStorage.getItem("user_token")
    .then((token)=>{
        myHeaders = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        return myHeaders;
    });
    

}
