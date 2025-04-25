import { signData } from "../utils";
import base_url from "../base_url";

async function getAnswerApi(question){
    const payload = {
        question:question,
        date:Date.now()
    };
    try{
        const dataString = JSON.stringify(payload);
        const signature = await signData(dataString);
        const response = await fetch(`${base_url}/api/gemini/answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-signature': signature 
        },
        body: dataString
        });
    
        const result = await response.json();
        return {response,result}
    }catch(err){
        throw new Error(err)
    }
  
}


export {getAnswerApi}