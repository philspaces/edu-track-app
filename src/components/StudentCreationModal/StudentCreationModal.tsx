import {useContext, useState} from 'react';
import {Box, Button, IconButton, Modal, TextField, Typography,} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import {useGlobalState} from "../../contexts/globalProvider.tsx";
import {useAmplifyClient} from "../../contexts/amplifyClientContext.tsx";
import {createStudent, updateStudent} from "../../graphql/mutations.js";
import {AuthContext} from "../../contexts/authContext.tsx";
import {format} from "date-fns";

export interface IStudent {
    studentID: string
    teacherID: string
    firstName: string
    lastName?: string
    dob?: string
    email?: string
    id?: string
}

const defaultStudentData: IStudent = {
    studentID: '',
    teacherID: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
}

type Props = {
    prefilledData?: any // Partial<IStudent>
}

const StudentCreationModal = ({prefilledData}: Props) => {
    const {modal: open, closeModal} = useGlobalState();
    const amplifyClient = useAmplifyClient()
    const {currentUser} = useContext(AuthContext)

    const [error, setError] = useState('')

    const initialStudentData = {
        ...(prefilledData ? ({
            ...prefilledData,
            dob: format(new Date(prefilledData?.dob), 'yyyy-MM-dd')
        }) : defaultStudentData),
        teacherID: currentUser?.userID
    }

    const [studentData, setStudentData] = useState<IStudent>(initialStudentData);

    const isValid = studentData.studentID.length === 0 || studentData.firstName.length === 0

    const handleChange = (e:any) => {
        const {name, value, type, checked} = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitStudentCreation = async (data: IStudent) => {
        try {
            const isEditing = data.id
            if (isEditing) {
                await amplifyClient.graphql({
                    query: updateStudent,
                    variables: {
                        input: {
                            id: data.id,
                            studentID: data.studentID,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            dob: data.dob,
                            teacherID: currentUser?.userID
                        }
                    }
                });
            } else {
                await amplifyClient.graphql({
                    query: createStudent,
                    variables: {
                        input: {
                            ...data,
                            teacherID: currentUser?.userID
                        }
                    }
                });
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }

    }

    const handleFormSubmit = async () => {
        const formattedData = {
            ...studentData,
            dob: studentData?.dob && new Date(studentData.dob).toISOString()
        }

        await handleSubmitStudentCreation(formattedData)

        if (!error) {
            closeModal();
        }
    };

    return (
        <Modal open={!!open} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <Typography variant="h6" component="h2" mb={2}>
                    Add a new student
                </Typography>

                <TextField
                    required={true}
                    label="Student ID"
                    name="studentID"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={studentData.studentID}
                />
                <TextField
                    required={true}
                    label="First name"
                    name="firstName"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={studentData.firstName}
                />
                <TextField
                    label="Last name"
                    name="lastName"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={studentData.lastName}
                />
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={studentData.email}
                />
                <TextField
                    label="DOB"
                    name="dob"
                    type="date"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={studentData.dob}
                />
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
                <Button
                    disabled={isValid}
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{mt: 2}}
                    fullWidth
                    onClick={handleFormSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default StudentCreationModal;
