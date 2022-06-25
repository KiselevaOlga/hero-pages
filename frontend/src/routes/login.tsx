import { Typography, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { theme } from "../theme";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { User } from "../App";
import { FormTextField } from "../helpers/FormTextField";

interface LoginPageProps {
  onLogin: (loginValues: User) => Promise<void>;
}
export const Login = ({ onLogin }: LoginPageProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: "30rem",
          maxHeight: "40rem",
          padding: 3,
          background: (theme) => theme.palette.primary.light,
          borderRadius: 3,
        }}
      >
        <Typography variant="h3">Login</Typography>
        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          onSubmit={(values: User, { setSubmitting }: FormikHelpers<User>) => {
            onLogin(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                label="Name"
                variant="standard"
                name="name"
                component={FormTextField}
              />
              <Field
                label="Password"
                variant="standard"
                name="password"
                type="password"
                component={FormTextField}
              />

              <Button
                type="submit"
                sx={{
                  background: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.secondary.contrastText,
                  '&:hover':{
                    background: (theme) => theme.palette.secondary.light,
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
