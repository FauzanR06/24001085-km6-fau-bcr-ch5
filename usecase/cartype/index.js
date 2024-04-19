const cartypeRepo = require("../../repository/cartype");

exports.getCarTypes = async () => {
  const data = await cartypeRepo.getCarTypes();
  return data;
};

exports.getCarType = async (id) => {
  const data = await cartypeRepo.getCarType(id);
  return data;
};
exports.createCarType = async (payload) => {
  const data = await cartypeRepo.createCarType(payload);
  return data;
};
exports.updateCarType = async (id, payload) => {
  // update data
  await cartypeRepo.updateCarType(id, payload);
  // find the new data
  const data = await cartypeRepo.getCarType(id);

  return data;
};
exports.deleteCarType = async (id) => {
  const data = await cartypeRepo.deleteCarType(id);
  return data;
};
