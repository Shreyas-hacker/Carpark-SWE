import axios from "axios";

export const searchCarpark = async (searchTerm) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://data.gov.sg/api/action/datastore_search",
      params: {
        resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
        q: searchTerm,
      },
    });

    return response.data.result.records;
  } catch (error) {
    console.log(error);
    return [];
  }
};
