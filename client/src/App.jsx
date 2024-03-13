import { Routing } from "./routing/Routing";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Routing />
    </div>
  );
}

export default App;
