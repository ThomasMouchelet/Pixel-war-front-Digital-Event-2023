import { useEffect, useState } from "react";
import { useRef } from "react";
import socketio from "socket.io-client";
import ColorsSelector from "../component/game/ColorsSelector";
import GameCanvas from "../component/game/GameCanvas";
import AuthModal from "../component/auth/AuthModal"

const GamePage = () => {
    const [color, setColor] = useState("#000");

    return ( 
        <div>
            <h1>Pixel War</h1>

            <GameCanvas color={color} />

            <ColorsSelector color={color} setColor={setColor} />

            <AuthModal />
        </div>
     );
}
 
export default GamePage;