import { Route, Routes } from 'react-router-dom';
import GamePage from '../page/GamePage';

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<GamePage />} />
        </Routes>
    );
}
 
export default MainRouter;