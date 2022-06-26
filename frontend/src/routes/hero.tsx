import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchObject } from "../components/UseFetch";
import { HeroResponse } from "./heroes";

export const Hero = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [response, isError, isLoading] = useFetchObject(`heroes/${params.id}`);

  const onDeleteHero = async () => {
    return await axios.delete(`/heroes/${params.id}`).then((res) => {
      if (res.data.length === 0) {
        navigate("/heroes");
      }
    });
  };
  return (
    <Box>
      {isError && (
        <Typography variant="body1">
          Oops, something went wrong, please reload the page
        </Typography>
      )}
      {isLoading && <Typography variant="body1">Loading ... </Typography>}
      {response && (
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              background: (theme) => theme.palette.primary.dark,
              maxHeight: "400px",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                maxWidth: "300px",
                overflow: "hidden",
              }}
            >
              <img
                alt={response.name}
                src={`../images/random/random${
                  Math.floor(Math.random() * 10) + 1
                }.jpg`}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  whiteSpace: "break-spaces",
                  color: (theme) => theme.palette.primary.contrastText,
                  textTransform: "uppercase",
                }}
              >
                {response.name}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3} sx={{p: 3}}>
            <Grid item xs={4}>
              <Box>
                <Typography variant="h5" sx={{ textTransform: "uppercase", borderBottom: '2px solid black', pb: 1, pt: 1 , mb: 3}}>
                  Power
                </Typography>
                <Typography variant="body1">{response.power}</Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="h5" sx={{ textTransform: "uppercase", borderBottom: '2px solid black', pb: 1, pt: 1,mb: 3 }}>
                  Description
                </Typography>
                <Typography variant="body1">{response.description}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              p: 3,
            }}
          >
            <Button
              onClick={() => setOpen(!open)}
              variant="contained"
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.secondary.contrastText,
                "&:hover": {
                  background: (theme) => theme.palette.secondary.dark,
                },
              }}
            >
              Delete hero
            </Button>
          </Box>
          <Dialog open={open} sx={{ borderRadius: 3 }}>
            <DialogTitle
              sx={{ background: (theme) => theme.palette.primary.light }}
            >
              Delete hero
            </DialogTitle>
            <DialogContent
              sx={{
                maxWidth: "30rem",
                maxHeight: "40rem",
                padding: 3,
                background: (theme) => theme.palette.primary.light,
              }}
            >
              <DialogContentText>
                Are you sure you want to delete information about{" "}
                {response.name}?
              </DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  paddingTop: 3,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => setOpen(!open)}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.palette.warning.main,
                    color: (theme) => theme.palette.secondary.contrastText,
                    "&:hover": {
                      background: (theme) => theme.palette.warning.dark,
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onDeleteHero}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.secondary.contrastText,
                    "&:hover": {
                      background: (theme) => theme.palette.secondary.dark,
                    },
                  }}
                >
                  Delete hero
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};
