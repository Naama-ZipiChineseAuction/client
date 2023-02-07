import React, { useEffect } from 'react';
import AppBarPage from "./AppBarPage"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from "formik";
import * as Yup from "yup"
import { Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import axios from 'axios';
const Input = styled('input')({
    display: 'none',
});
function Copyright(props) {


    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const validationSchema = Yup.object({
    user_name: Yup.string().required('שדה חובה'),
    user_phone: Yup.string().required('שדה חובה'),
    user_email: Yup.string().email('נא התאם לתבנית אימייל').required('אימייל זהו שדה חובה'),
    user_password: Yup.string().required('סיסמא זהו שדה חובה'),
})

const theme = createTheme();

export default function SignUp() {


    let navigate = useNavigate()
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid } = useFormik({
        initialValues: {
            user_name: '',
            user_password: '',
            user_phone: '',
            user_password: ''
        },
        validationSchema,
        onSubmit: (values) => {

            axios.post(`http://localhost:4500/user/addUser`, values).then(res => {
                swal({
                    title: values.user_name + " אנו שמחים שהתחברת בהצלחה",
                    icon: "success",
                    button: "Aww yiss!",
                });
                navigate("../Prizes")

                localStorage.setItem("currentUser", JSON.stringify(values));

            }
            ).catch(er => {

                swal({
                    title: values.user_name + "  שם ומייל כבר  קימים במערכת",
                    icon: "error",
                    button: "Aww yiss!",
                });
                navigate("../signIn")
            }
            )
        },
    })

    return (<>
        <AppBarPage />
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user_name"
                                    label="name"
                                    name="user_name"
                                    autoComplete="name"
                                    error={errors.firstName && touched.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}

                                />
                                {errors.user_name && touched.user_name && <Alert variant="outlined" style={{ borderColor: "white" }} severity="error">
                                    {errors.user_name}
                                </Alert>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user_phone"
                                    label="phone"
                                    name="user_phone"
                                    autoComplete="phone"
                                    error={errors.user_phone && touched.user_phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}

                                />
                                {errors.user_phone && touched.user_phone && <Alert variant="outlined" style={{ borderColor: "white" }} severity="error">
                                    {errors.user_phone}
                                </Alert>}
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="user_email"
                                    label="email"
                                    name="user_email"
                                    autoComplete="user_email"
                                    type="email"
                                    error={errors.user_email && touched.user_email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_email}
                                />
                                {errors.user_email && touched.user_email && <Alert variant="outlined" style={{ borderColor: "white" }} severity="error">
                                    {errors.user_email}
                                </Alert>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="user_password"
                                    label="Password"
                                    type="password"
                                    id="user_password"
                                    error={errors.user_password && touched.user_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.user_password}
                                />
                                {errors.user_password && touched.user_password && <Alert variant="outlined" style={{ borderColor: "white" }} severity="error">
                                    {errors.user_password}
                                </Alert>}
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!dirty || !isValid}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate("../signIn")} style={{ cursor: "pointer" }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    </>
    );
}