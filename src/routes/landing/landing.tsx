import {useNavigate} from 'react-router-dom'
import logoImage from '../../assets/react.svg'
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import {Pathname} from "../constants.ts";

const PREFIX = 'Landing';

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`
};


const StyledGrid = styled('div')(({theme}) => ({
    margin: 'auto',
    textAlign: 'center'
}));

const Landing: FunctionComponent = () => {
    const navigate = useNavigate()

    const signIn = () => {
        navigate(Pathname.SIGN_IN)
    }

    return (<StyledGrid className={classes.root}>
            <Box m={2}>
                <img src={logoImage} width={224} height={224} alt="logo"/>
            </Box>
            <Box m={2}>
                <Typography className={classes.title} variant="h3">
                    Edu Track App
                </Typography>
            </Box>
            <Box m={2}>
                <Button onClick={signIn} variant="contained" color="primary">
                    SIGN IN
                </Button>
            </Box>
        </StyledGrid>
    );
}

export default Landing
