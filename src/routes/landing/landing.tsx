import {useNavigate} from 'react-router-dom'
import logoImage from '../../assets/edu-track-logo.png'
import {Box, Button, styled} from "@mui/material";
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
            <Box>
                <img src={logoImage} width={500} height={500} alt="logo"/>
            </Box>
            <Box>
                <Button onClick={signIn} variant="contained" color="primary">
                    SIGN IN
                </Button>
            </Box>
        </StyledGrid>
    );
}

export default Landing
