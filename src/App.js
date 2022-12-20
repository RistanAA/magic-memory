import Router from "./Router";
import UseMobileAuthentication from "./hooks/useMobileAuthentication";

function App() {
  return (
    <UseMobileAuthentication>
      <Router />
    </UseMobileAuthentication>
  );
}

export default App;
