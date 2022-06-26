import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HeroCard } from "../components/HeroCard";
import { NewHeroForm } from "../components/NewHeroForm";
import { useFetchList } from "../components/UseFetch";

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
  const [showSnackbar, setShowSnackBar] = useState<null | "error" | "success">(
    null
  );
  const [response, isError, isLoading, refetch] = useFetchList("heroes");

  const onAddNewHero = async (hero: CreateHero) => {
    return await axios.post("/heroes", { ...hero }).then((res) => {
      if (res.data.id) {
        setOpen(!open);
        refetch({});
        setShowSnackBar("success");
      } else {
        setShowSnackBar("error");
      }
    });
  };
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
              p: 3,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6">
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
          alt={"Comic heroes"}
          src={"images/comicHeroes.jpg"}
          style={{
            maxHeight: "30rem",
            width: "100%",
            objectFit: "cover",
            opacity: "0.3",
          }}
        />
      </Box>
      <Box
        component={"section"}
        sx={{
          padding: 3,
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            lg: "repeat(auto-fit,minmax(calc((100% - (24px * 5)) / 5),1fr))",
            sm: "repeat(3, 1fr)",
          },
        }}
      >
        {isError && (
          <Typography variant="body1">
            Oops, something went wrong, please reload the page
          </Typography>
        )}
        {isLoading && <Typography variant="body1">Loading ... </Typography>}
        {response &&
          response.map((item: HeroResponse) => (
            <Link
              to={`${item.id}`}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
              <HeroCard
                name={item.name}
                randomNum={Math.floor(Math.random() * 10) + 1}
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
            Please provide name, short description (1-2 sentences),
            description(longer and detailed) and power of your owm hero
          </DialogContentText>
          <NewHeroForm
            onSubmit={onAddNewHero}
            onCancel={() => setOpen(!open)}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={!!showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackBar(null)}
      >
        <Alert
          onClose={() => setShowSnackBar(null)}
          severity={showSnackbar === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {showSnackbar === "success"
            ? "New super hero has been added!"
            : "Something went wrong, please try again later!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};
