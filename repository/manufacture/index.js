const { manufacture, car } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getManufactures = async () => {
  const data = await manufacture.findAll({
    include: {
      model: car,
    },
  });
  return data;
};

exports.getManufacture = async (id) => {
  // let redisClient, data;
  const key = `manufacture:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from db
  data = await manufacture.findAll({
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

  throw new Error(`manufacture is not found!`);
};

exports.createManufacture = async (payload) => {
  // Create data to postgres
  const data = await manufacture.create(payload);

  // Save to redis (cache)
  const key = `manufacture:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateManufacture = async (id, payload) => {
  const key = `manufacture:${id}`;

  // update data to postgres
  await manufacture.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await manufacture.findAll({
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

  throw new Error(`manufacture is not found!`);
};

exports.deleteManufacture = async (id) => {
  const key = `manufacture:${id}`;

  // delete from postgres
  await manufacture.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
