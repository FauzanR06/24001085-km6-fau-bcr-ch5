const cartypeUsecase = require("../usecase/cartype");

exports.getCarTypes = async (req, res, next) => {
  try {
    const data = await cartypeUsecase.getCarTypes();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await cartypeUsecase.getCarType(id);
    if (!data) {
      return next({
        message: `Cartype with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCarType = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name == "") {
      return next({
        message: "Name must be provided!",
        statusCode: 400,
      });
    }

    const data = await cartypeUsecase.createCarType({
      name,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCarType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || name == "") {
      return next({
        message: "Name must be provided!",
        statusCode: 400,
      });
    }

    const data = await cartypeUsecase.updateCarType(id, { name });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await cartypeUsecase.deleteCarType(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
