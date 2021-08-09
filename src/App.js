import ListPage from "./Table/table";
import "./index.css";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <ListPage />
    </Router>
  );
}
