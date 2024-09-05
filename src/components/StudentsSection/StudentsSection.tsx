import {
    Box,
    CardActions,
    Card,
    CardContent,
    Fab,
    Typography,
    useTheme,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useGlobalState} from "../../contexts/globalProvider.tsx";
import StudentCreationModal from "../StudentCreationModal/StudentCreationModal.tsx";
import Grid from '@mui/material/Grid2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAmplifyClient} from "../../contexts/amplifyClientContext.tsx";
import {listStudents} from "../../graphql/queries.js";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../contexts/authContext.tsx";
import {format} from "date-fns";

const StudentCard = ({student}) => (
    <Card>
        <CardContent>
            <Typography variant="h6" component="div">
                {student.firstName} {student.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {student.email}
            </Typography>
            <Typography variant="body2">
                Date of Birth: {format(new Date(student.dob), 'P') }
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="edit">
                <EditNoteIcon/>
            </IconButton>
            <IconButton aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </CardActions>
    </Card>
);

const StudentsSection = () => {
    const theme = useTheme(); // Access the theme
    const {modal, openModal} = useGlobalState();

    const authContext = useContext(AuthContext)
    const currentUser = authContext.currentUser
    const amplifyClient = useAmplifyClient();
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const studentData = await amplifyClient.graphql({
                query: listStudents,
                variables: {filter: {teacherID: {eq: currentUser.userID}}}
            });

            console.log('studentData: ', studentData);
            setStudents(studentData.data.listStudents.items);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);


    const cardSize = {xs: 12, md: 6, lg: 3}
    return (
        <Box sx={{p: 3}}>
            {modal && <StudentCreationModal/>}

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                    All Students
                </Typography>
            </Box>

            <Box sx={{borderBottom: '2px solid #2ecc71', width: '50px', mb: 3}}/>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    {students.map((student) => (
                        <Grid key={student.id} size={cardSize}>
                            <StudentCard student={student}/>
                        </Grid>
                    ))}
                    <Grid size={cardSize}>
                        <Card sx={{
                            border: '2px dashed #4A4A4A',
                            cursor: 'pointer',
                            paddingY: '8px',
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
                    </Grid>
                </Grid>
            </Box>

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
