import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  console.log("Request body: ", req.body);
  try {
    const result = await vehicleServices.createVehicle(req.body);
    console.log("Show vehicle:", result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
};
