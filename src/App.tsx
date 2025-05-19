import CookieClicker from "./components/CookieComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Enzo Cookie Clicker</h1>
      <CookieClicker initialCookies={0} />
    </div>
  );
}

export default App;

// Local Storage / Auth 