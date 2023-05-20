import * as React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Rating, Avatar } from "@mui/material";
import { useTheme } from "@mui/material";

export default function TextMobileStepper({ opinions }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = opinions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",

        border: "solid 1px",
        padding: "25px",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          pb: "10px",
        }}
      >
        Opiniones de Pascientes
      </Typography>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 30,
          pl: 2,
          bgcolor: theme.palette.primary.light,
          borderRadius: "10px",
          p: "25px",
          width: "100%",
        }}
      >
        <Avatar src={opinions[activeStep].img}></Avatar>
        <Typography
          sx={{
            color: "white",
            pl: "30px",
          }}
        >
          {opinions[activeStep].name}
        </Typography>
      </Paper>
      <Box component="fieldset" mb={1} borderColor="transparent">
        <Rating
          name="stars"
          sx={{ color: theme.palette.primary.main }}
          value={opinions[activeStep].stars}
          readOnly
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          pb: "30px",
        }}
      >
        {opinions[activeStep].text}
      </Box>
      <MobileStepper
        variant="text"
        opinions={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Siguiente
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Atras
          </Button>
        }
      />
    </Box>
  );
}
