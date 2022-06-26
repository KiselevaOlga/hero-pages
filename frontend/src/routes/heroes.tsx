import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../App";
import { FormTextField } from "../components/FormTextField";
import { HeroCard } from "../components/HeroCard";

const data = [
  { id: 1, name: "Peter" },
  { id: 2, name: "Anna" },
];

export interface HeroResponse {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  power: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateHero {
  name: string;
  shortDescription: string;
  description: string;
  power: string;
}

export const Heroes = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<HeroResponse[] | []>([]);
  const getListOfHeroes = async () => {
    try {
      const response = await axios.get("/heroes");
      setHeroes(response.data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const onAddNewHero = async (hero: CreateHero) => {
    return await axios
      .post("/heroes", { ...hero })
      .then((res) => console.log("res", res));
  };

  useEffect(() => {
    getListOfHeroes();
    return () => {};
  }, []);
  return (
    <Box>
      <Box
        component={"section"}
        sx={{
          background: "black",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: "2",
            color: (theme) => theme.palette.primary.contrastText,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
            Super heroes
          </Typography>
          <Typography variant="body1">
            Explore your favorite super heroes and create your own!
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Typography variant="body1">
              Do you want to create your own hero?
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpen(!open)}
              sx={{
                background: (theme) => theme.palette.secondary.main,
                "&:hover": {
                  background: (theme) => theme.palette.secondary.dark,
                },
              }}
            >
              Get started
            </Button>
          </Box>
        </Box>

        <img
          src={"images/comicHeroes.jpg"}
          style={{
            maxHeight: "30rem",
            width: "100%",
            objectFit: "cover",
            opacity: "0.4",
          }}
        />
      </Box>
      <Box
        component={"section"}
        sx={{
          padding: 3,
          display: "grid",
          gap: 3,
          gridTemplateColumns:
            "repeat(auto-fit,minmax(calc((100% - (24px * 5)) / 5),1fr))",
        }}
      >
        {heroes.map((item) => (
          <Link
            to={`${item.id}`}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <HeroCard
              name={item.name}
              randomNum={Math.floor(Math.random() * 11)}
            />
          </Link>
        ))}
      </Box>

      <Dialog open={open} sx={{ borderRadius: 3 }}>
        <DialogTitle
          sx={{ background: (theme) => theme.palette.primary.light }}
        >
          Add new hero
        </DialogTitle>
        <DialogContent
          sx={{
            maxWidth: "30rem",
            maxHeight: "40rem",
            padding: 3,
            background: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <DialogContentText>
            Please provide name, short description of your hero, description
          </DialogContentText>
          <Box>
            <Formik
              initialValues={{
                name: "",
                shortDescription: "",
                description: "",
                power: "",
              }}
              onSubmit={(
                values: CreateHero,
                { setSubmitting }: FormikHelpers<CreateHero>
              ) => {
                onAddNewHero(values);
                setSubmitting(false);
                setOpen(!open)
              }}
            >
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Field
                    label="Name"
                    variant="standard"
                    name="name"
                    component={FormTextField}
                  />
                  <Field
                    label="Short description"
                    variant="standard"
                    name="shortDescription"
                    component={FormTextField}
                  />
                  <Field
                    label="Description"
                    variant="standard"
                    name="description"
                    component={FormTextField}
                  />{" "}
                  <Field
                    label="Power"
                    variant="standard"
                    name="power"
                    component={FormTextField}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button onClick={() => setOpen(!open)}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
