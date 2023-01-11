import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketio from "socket.io-client";

const SocketContext = createContext();

const ContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const user = useSelector(state => state.userReducer)

    useEffect(() => {
        const localUser  = JSON.parse(localStorage.getItem("user"));
        const socketConnect = socketio.connect(process.env.REACT_APP_API_URL, {
            extraHeaders: {
                Authorization: localUser ? localUser.access_token : ''
            }
        })

        setSocket(socketConnect)

        socketConnect.on('connect', () => {
            console.log('Socket connected')
        })

        socketConnect.on('disconnect', () => {
            console.log('Socket disconnected')
        })
    }, [user])

    // const getAllLastUsers = () => {
    //     socket.emit('getLastUsers')
    // }

    if(!socket) return (<div>Loading...</div>)
    return ( 
        <SocketContext.Provider value={{
                socket,
            }}
        >
            {children}
        </SocketContext.Provider>
     );
}
 
export { ContextProvider, SocketContext };