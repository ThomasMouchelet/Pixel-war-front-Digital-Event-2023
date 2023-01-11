import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routing/MainRouter";
import { ContextProvider } from "./setup/context/SocketContext";
import UserService from "./setup/service/user.service";
import { store } from './setup/redux/store';

function App() {

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const user = await UserService.getCurrentUser();
    store.dispatch({ type: 'user/update', payload: user })
  }

  return (
    <Provider store={store}>
      <ContextProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </ContextProvider>
    </Provider>
  );
}

export default App;
