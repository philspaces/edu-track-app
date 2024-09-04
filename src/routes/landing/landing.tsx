import {useNavigate} from 'react-router-dom'
import logoImage from '../../assets/react.svg'
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import {FunctionComponent} from "react";

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
        navigate('/signin')
    }

    return (<StyledGrid container className={classes.root}>
            <Box m={2}>
                <img src={logoImage} width={224} height={224} alt="logo"/>
            </Box>
            <Box m={2}>
                <Typography className={classes.title} variant="h3">
                    AWS Cognito
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
