import { createRoot } from "react-dom/client";
import Entry from "./pages/entry/Entry.tsx";
import gasp from 'gsap'
import {useGSAP} from "@gsap/react";
import "./index.css";
gasp.registerPlugin(useGSAP);
const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(<Entry />);
}
