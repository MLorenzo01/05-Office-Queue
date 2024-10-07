const baseURL = "http://localhost:3001";

// ----------------- SERVICES ----------------- //

// Get all the available services
export const getServices = async () => {
  const response = await fetch(`${baseURL}/api/services`);
  if(response.ok){
    const services = await response.json();
    return services;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
};