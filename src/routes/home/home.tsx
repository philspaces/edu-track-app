import {FormEvent, useContext, useState} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../../public/vite.svg'
import {AuthContext} from "../../contexts/authContext.tsx";
import {Pathname} from "../constants.ts";
import {useNavigate} from "react-router-dom";

function Home() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [count, setCount] = useState(0)

    const handleSignOut = async (event: FormEvent) => {
        event.preventDefault();

        await authContext.signOut()
        navigate(Pathname.DEFAULT)
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <button onClick={handleSignOut}>
                Sign out
            </button>
        </>
    )
}

export default Home