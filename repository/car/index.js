const crypto = require("crypto");
const path = require("path");
const { cartype, car, manufacture } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCars = async () => {
  const data = await car.findAll({
    include: {
      model: cartype,
      manufacture,
    },
  });
  return data;
};

exports.getCar = async (id) => {
  const key = `Cars:${id}`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from db
  data = await car.findAll({
    where: {
      id,
    },
    include: {
      model: cartype,
      manufacture,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.createCar = async (payload) => {
  if (payload.photo) {
    // upload image to cloudinary
    const { photo } = payload;

    // make unique filename -> 213123128uasod9as8djas
    photo.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }

  // save to db
  const data = await car.create(payload);

  // save to redis
  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCar = async (id, payload) => {
  const key = `cars:${id}`;

  if (payload.photo) {
    // upload image to cloudinary
    const { photo } = payload;

    // make unique filename -> 213123128uasod9as8djas
    photo.publicId = crypto.randomBytes(16).toString("hex");

    // rename the file -> 213123128uasod9as8djas.jpg / 213123128uasod9as8djas.png
    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }

  // update to postgres
  await car.update(payload, {
    where: {
      id,
    },
  });

  // get from postgres
  const data = await car.findAll({
    where: {
      id,
    },
    include: {
      model: cartype,
      manufacture,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  return data;
};

exports.deleteCar = async (id) => {
  const key = `cars:${id}`;

  // delete from postgres
  await car.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
