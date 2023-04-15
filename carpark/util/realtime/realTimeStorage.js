import axios from "axios";

const BACKEND_URL =
  "https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app";

export function storeReport(reportData) {
  axios.post(BACKEND_URL + "/reports.json", reportData);
}

export async function fetchReports(email) {
  const response = await axios.get(BACKEND_URL + "/reports.json");
  const reports = [];

  for (const key in response.data) {
    if (response.data[key].user_id === email) {
      const reportObject = {
        id: key,
        email: response.data[key].user_id,
        carpark: response.data[key].carpark_no,
        address: response.data[key].address,
        description: response.data[key].description,
        severity: response.data[key].severity,
        fault: response.data[key].fault_type,
      };
      reports.push(reportObject);
    }
  }
  return reports;
}

export async function fetchSevereFaults() {
  const response = await axios.get(BACKEND_URL + "/reports.json");
  var Severefaults = [];
  for (const key in response.data) {
    if (response.data[key].severity === "3") {
      const reportObject = {
        id: key,
        carpark: response.data[key].carpark_no,
        address: response.data[key].address,
        description: response.data[key].description,
        fault: response.data[key].fault_type,
        photo: response.data[key].photo,
        date: response.data[key].dateOfCreation,
      };
      Severefaults.push(reportObject);
    }
  }
  Severefaults = Severefaults.reverse();
  return Severefaults;
}

export async function fetchReport_carparks(carpark) {
  const response = await axios.get(BACKEND_URL + "/reports.json");
  const reports = [];
  count = 0;

  for (const key in response.data) {
    if (response.data[key].carpark_no === carpark.car_park_no) {
      count++;
      const reportObject = {
        id: key,
        email: response.data[key].user_id,
        carpark: response.data[key].carpark_no,
        address: response.data[key].address,
        description: response.data[key].description,
        severity: response.data[key].severity,
        fault: response.data[key].fault_type,
        count: count,
      };
      reports.push(reportObject);
    }
  }
  return reports;
}
