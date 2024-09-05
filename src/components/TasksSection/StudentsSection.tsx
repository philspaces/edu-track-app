import {Box, Card, CardContent, Fab, Typography, useTheme} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useGlobalState} from "../../contexts/globalProvider.tsx";
// import TaskModal from "../TaskModal/TaskModal.tsx";

const StudentsSection = () => {
    const theme = useTheme(); // Access the theme
    const {modal, openModal} = useGlobalState();

    return (
        <Box sx={{p: 3}}>
            {/*{modal && <TaskModal/>}*/}

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                    All Students
                </Typography>
            </Box>

            <Box sx={{borderBottom: '2px solid #2ecc71', width: '50px', mb: 3}}/>

            <Card sx={{
                border: '2px dashed #4A4A4A',
                cursor: 'pointer',
                maxWidth: '300px',
                backgroundColor: theme.palette.background.default,
                '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                        ? theme.palette.grey[900]
                        : theme.palette.grey[300],
                },
            }}
                  onClick={openModal}
            >
                <CardContent sx={{textAlign: 'center'}}>
                    <AddIcon sx={{fontSize: 40, mb: 2}}/>
                    <Typography variant="h6">
                        Add New Student
                    </Typography>
                </CardContent>
            </Card>

            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px'
                }}
                onClick={openModal}
            >
                <AddIcon/>
            </Fab>
        </Box>
    );
};

export default StudentsSection;
