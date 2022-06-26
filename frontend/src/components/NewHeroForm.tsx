import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { CreateHero } from "../routes/heroes";
import { FormTextField } from "./FormTextField";

interface NewHeroForm {
    onSubmit:(hero: CreateHero) => Promise<void>;
    onCancel: () => void
}

export const NewHeroForm = ({onSubmit, onCancel}: NewHeroForm): JSX.Element =>{
    return (
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
                onSubmit(values);
                setSubmitting(false);
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
                    pt: 3,
                  }}
                >
                  <Button
                    onClick={onCancel}
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
                    type="submit"
                    variant="contained"
                    sx={{
                      background: (theme) => theme.palette.success.main,
                      color: (theme) => theme.palette.primary.contrastText,
                      "&:hover": {
                        background: (theme) => theme.palette.success.dark,
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
    )
}