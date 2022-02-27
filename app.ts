import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import dotenv from "dotenv";
// import { router } from "./routes/routes";
import Employee from "./model/employeeSchema";

const app = express();
dotenv.config();
app.use(json());

const uri =
  "mongodb+srv://naveen:naveen@cluster0.qemkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, () => {
  console.log("DB Connected Successfully");
});

app.get("/", (req: Request, res: Response) => {
  res.send("It's About Page");
});

// Get all Employees

app.get("/allemployees", async (req: Request, res: Response) => {
  try {
    const allEmployees = await Employee.find();
    res.status(200).json({
      status: "sucess",
      data: allEmployees,
    });
  } catch (err) {
    res.status(500);
  }
});

//  Adding Employee
app.post("/addemployee", async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    // console.log(req.body)
    const addEmployee = await Employee.create({
      id: req.body.id,
      name: req.body.name,
      designation: req.body.designation,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
    });
    res.status(200).json({
      status: "sucess",
      data: addEmployee,
    });
  } catch (err) {
    res.json({
      status: "Failed",
    });
  }
});

// Get Employee By Id
app.get("/:id", async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const oneEmployee = await Employee.find({ _id: req.params.id });
    if (!oneEmployee) {
      return res.status(404).json({
        status: "Failed",
        message: "Employee Not Found",
      });
    }
    // console.log(oneEmployee);
    return res.json({
      status: "success",
      message: oneEmployee,
    });
  } catch (e) {
    res.status(500).json({
      status: "Employee Not Found",
    });
  }
});

// ------------- Update order By ID --------------

app.put("/:id", async function (req: Request, res: Response) {
  try {
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({
      status: "Sucess",
      data: updateEmployee,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
    });
  }
});

//  DElete Employee
app.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleteEmployee = await Employee.deleteOne({ _id: req.params.id });
    return res.json({
      status: "Deleted Successfully",
      message: deleteEmployee,
    });
  } catch (e: any) {
    res.status(500).json({
      status: "Employee Not deleted",
      Error: e.message,
    });
  }
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`port is listening at http://localhost:${port}/`);
});
