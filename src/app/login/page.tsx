"use client";
import React from "react";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { userLogin } from "@/lib/authslice";
import { useDispatch } from "react-redux";
import { store } from "./../../lib/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  let router = useRouter();
  let dispatch = useDispatch<typeof store.dispatch>();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(userLogin(values))
        .then((res) => {
          console.log("res", res);
          if (res.payload.message == "success") {
            console.log(res.payload)
            localStorage.setItem("userToken", res.payload.token)
            toast.success("Welcome Back 👋");
            router.push("/")
          } else {
            // console.log(res.payload)
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBlock: "20px" }}>
        <Paper sx={{ padding: "15px" }} elevation={20}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              id="email"
              label="Email..."
              variant="outlined"
            />
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
              label="Password..."
              variant="outlined"
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "10px",
                border: "1px solid transparent",
                ":hover": { color: "#1976d2", border: "1px solid #1976d2" },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
