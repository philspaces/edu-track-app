// import TextField from '@material-ui/core/TextField'

import {TextField} from "@mui/material";
import {FunctionComponent} from "react";

export const Email: FunctionComponent<{ email: string, emailIsValid: boolean; setEmail: (_: string) => void }> = ({
                                                                                                                      email,
                                                                                                                      emailIsValid,
                                                                                                                      setEmail,
                                                                                                                  }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={emailIsValid ? 'Email' : 'Invalid Email'}
            error={!emailIsValid}
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    )
}

export const Password: React.FunctionComponent<{
    label: string
    password: string
    passwordIsValid: boolean
    setPassword: (_: string) => void
}> = ({label, password, passwordIsValid, setPassword}) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={passwordIsValid ? label : 'Minimum 8 characters'}
            error={!passwordIsValid}
            type="password"
            id={label}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    )
}

export const Username: React.FunctionComponent<{
    usernameIsValid: boolean;
    username: string,
    setUsername: (_: string) => void
}> = ({
          usernameIsValid,
          username,
          setUsername,
      }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={usernameIsValid ? 'Username' : 'Minimum 8 characters'}
            error={!usernameIsValid}
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    )
}

export const Code: FunctionComponent<{ code: string, codeIsValid: boolean; setCode: (_: string) => void }> = ({
                                                                                                                  code,
                                                                                                                  codeIsValid,
                                                                                                                  setCode,
                                                                                                              }) => {
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label={codeIsValid ? 'Code' : 'Minimum 6 characters'}
            error={!codeIsValid}
            name="code"
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value)}
        />
    )
}
