import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { SocketContext } from "../../../setup/context/SocketContext";

const gridCellSize = 10

const GameCanvas = ({color}) => {
    const { socket } = useContext(SocketContext);
    const gameRef = useRef(null);
    const cursorRef = useRef(null);
    const [game, setGame] = useState(null);
    const [cursor, setCursor] = useState(null);
    const [ctx, setCtx] = useState(null);
    
    useEffect(() => {
        const game = gameRef.current;
        const cursor = cursorRef.current;
        const ctx = game.getContext('2d');
        const gridCtx = game.getContext('2d');
        setGame(game);
        setCursor(cursor);
        setCtx(ctx);
        game.width = 1200
        game.height = 600

        drawGrids(gridCtx, game.width, game.height, gridCellSize, gridCellSize)

        socket.on("newPixel", (pixels) => {
            console.log("New pixel", pixels);
            pixels.forEach(pixel => {
                const { x, y, color } = pixel
                createPixel({x, y, color, ctx})
            });
        });

        game.addEventListener('mousemove', function (event) {
            const cursorLeft = event.clientX - (cursor.offsetWidth / 2)
            const cursorTop = event.clientY - (cursor.offsetHeight / 2)
            cursor.style.left = Math.floor(cursorLeft / gridCellSize) * gridCellSize + "px"
            cursor.style.top = Math.floor(cursorTop / gridCellSize) * gridCellSize + "px"
        })
    }, [])

    useEffect(() => {
        if(!game || !cursor || !ctx) return;
        cursor.addEventListener('click', function (event) {
            addPixelIntoGame({ctx, cursor, game, color})
        })
        game.addEventListener('click', function () {
            addPixelIntoGame({ctx, cursor, game, color})
        })
    }, [color, cursor, ctx, game])

    function createPixel({x, y, color, ctx}) {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(x, y, gridCellSize, gridCellSize)
    }

    function addPixelIntoGame({ctx, cursor, game, color}) {
        const x = cursor.offsetLeft
        const y = cursor.offsetTop - game.offsetTop
        createPixel({x, y, ctx, color})
        const pixel = {x, y, color}
        socket.emit("newPixel", pixel);
    }

    function drawGrids(ctx, width, height, cellWidth, cellHeight) {
        ctx.beginPath()
        ctx.strokeStyle = "#ccc"
    
        for (let i = 0; i < width; i++) {
            ctx.moveTo(i * cellWidth, 0)
            ctx.lineTo(i * cellWidth, height)
        }
    
        for (let i = 0; i < height; i++) {
            ctx.moveTo(0, i * cellHeight)
            ctx.lineTo(width, i * cellHeight)
        }
        ctx.stroke()
    }

    return ( 
        <div>
            <div id="cursor" ref={cursorRef}></div>
            <canvas id="game" ref={gameRef}></canvas>
        </div>
     );
}
 
export default GameCanvas;