import axios from "axios";

export function storeAccount(accountInfo){
    axios.post('https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app/accounts.json'),
    accountInfo
}