//store image url and reports into real time storage
import axios from "axios";

const BACKEND_URL = 'https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app/';

export function storeReport(reportData){
    axios.post(BACKEND_URL+'/reports.json', reportData);
}