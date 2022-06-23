import axios from "axios";

export const ApiResponse = async (method,url,body) =>{
    try{
        const response = axios({
            method: method,
            url: url,
            data: body
        })

        return response.data;
    } catch(err){
        console.log(err.response.data.message);
        return err.response.data.message;
    }
}