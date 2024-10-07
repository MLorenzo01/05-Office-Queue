import serviceDao from '../dao/serviceDao.mjs';

// Method to retrieve all services by interacting with the DAO
export const getServices = async () => {
  try {
    const services = await serviceDao.getAllServices();
    return services;
  } catch (error) {
    throw error;
  }
};
