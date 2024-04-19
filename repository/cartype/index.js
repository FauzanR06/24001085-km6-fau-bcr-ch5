const { cartype, car } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCarTypes = async () => {
  const data = await cartype.findAll({
    include: {
      model: car,
    },
  });
  return data;
};

exports.getCarType = async (id) => {
  // let redisClient, data;
  const key = `cartype:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from db
  data = await cartype.findAll({
    where: {
      id,
    },
    include: {
      model: car,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`CarType is not found!`);
};

exports.createCarType = async (payload) => {
  // Create data to postgres
  const data = await cartype.create(payload);

  // Save to redis (cache)
  const key = `cartype:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCarType = async (id, payload) => {
  const key = `cartype:${id}`;

  // update data to postgres
  await cartype.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await cartype.findAll({
    where: {
      id,
    },
    include: {
      model: car,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`cartype is not found!`);
};

exports.deleteCarType = async (id) => {
  const key = `cartype:${id}`;

  // delete from postgres
  await cartype.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
