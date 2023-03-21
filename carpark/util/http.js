import axios from "axios";

const BACKEND_URL = 'https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app'
export function storeAccount(accountInfo){
    axios.post(BACKEND_URL+'/accounts.json',accountInfo);
}

export async function fetchAccounts(){
    const response = await axios.get(BACKEND_URL+'/accounts.json');

    const accounts = []

    for (const key in response.data){
        const accountObject = {
            id: key,
            username: response.data[key].username,
            password: response.data[key].password
        }
        accounts.push(accountObject);
    }

    return accounts;
}