import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUser(req.body);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "POST API is working...",
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);
    // console.log(result.rows[0]);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = {
  signUp,
  loginUser,
};
