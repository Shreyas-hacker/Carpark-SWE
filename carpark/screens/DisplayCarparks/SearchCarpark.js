import axios from "axios";

export async function searchCarpark(searchTerm=""){
  try {
    const response = await axios({
      method: "get",
      url: "https://data.gov.sg/api/action/datastore_search",
      params: {
        resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
        q: searchTerm,
        limit: 100,
      },
    });

    return response.data.result.records;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function convertLatLong(easting,northing){
  try{
    const response = await axios({
      method: "get",
      url:'https://developers.onemap.sg/commonapi/convert/3414to4326',
      params:{
        'X': parseFloat(easting),
        'Y':parseFloat(northing)
      }
    }
    );
    return response.data;
  } catch(error){
    console.log(error);
    return {}
  }
}
