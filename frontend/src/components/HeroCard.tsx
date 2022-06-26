import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

interface HeroCardProps {
  name: string;
  randomNum: number;
}

export const HeroCard = ({
  name,
  randomNum
}: HeroCardProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        height: "100%",
        position: "relative",
        background: (theme) => theme.palette.primary.dark,
        overflow: "hidden",
        transform: "scale(1)",
        zIndex: 1,
        "&:after": {
          content: '""',
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "#fff",
          borderStyle: "solid",
          borderTopColor: "transparent",
          borderWidth: "12px 12px 0 0",
          bottom: 0,
          position: "absolute",
          right: 0,
          top: "auto",
        },
        transition: "all .2s linear",
        "&:hover": {
          "& > div": {
            "& > img": {
              transform: "scale(1.1)",
            },
            "&:nth-child(2)": {
                "&:before": {
                  transform: "translateY(calc(100% - 6px))",
                },
              },
          },
        },
      }}
    >
      <Box
        sx={{
          background: "black",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          maxHeight: "60%",
          zIndex: 3,
          overflow: "hidden",
          transition: "all .2s linear",
        }}
      >
        <img
        //   src={`images/hero/${name.replace(" ", "-")}.jpg`}
        src={`images/random/random${randomNum}.jpg`}
          style={{
            objectFit: "cover",
            width: "100%",
            transition: "all .2s linear",
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          zIndex: 2,
          position: "relative",
          "&:after": {
            content: '""',
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "#fff",
            borderStyle: "solid",
            borderTopColor: "transparent",
            borderWidth: "12px 12px 0 0",
            bottom: 0,
            position: "absolute",
            right: 0,
            top: "auto",
          },
          "&:before": {
            content: '""',
            zIndex: -1,
            top: "calc(-100% + 6px)",
            position: "absolute",
            height: "100%",
            width: "100%",
            transition: "all .2s linear",
            background: (theme) => theme.palette.secondary.main,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.secondary.contrastText,
            ml: 2,
            mt: 2
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};
