import { createRoot } from "react-dom/client";
import "./index.css";
import Entry from "./pages/entry/Entry.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(<Entry />);
}
