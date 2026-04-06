import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

function installProductionGuards() {
	if (!import.meta.env.PROD) {
		return;
	}

	const blockedCombos = new Set(["i", "j", "c", "u", "s"]);
	const overlayId = "devtools-warning-overlay";

	const warningStyle = document.createElement("style");
	warningStyle.textContent = `
		.devtools-guard-active #root {
			filter: blur(10px) !important;
			pointer-events: none !important;
			user-select: none !important;
		}

		#${overlayId} {
			position: fixed;
			inset: 0;
			display: none;
			align-items: center;
			justify-content: center;
			padding: 24px;
			background: rgba(4, 8, 18, 0.94);
			color: #f8fafc;
			font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
			font-size: 1rem;
			line-height: 1.5;
			text-align: center;
			z-index: 2147483647;
		}

		.devtools-guard-active #${overlayId} {
			display: flex;
		}
	`;
	document.head.appendChild(warningStyle);

	const overlay = document.createElement("div");
	overlay.id = overlayId;
	overlay.textContent = "Developer tools detected. Close DevTools to continue browsing this site.";
	document.body.appendChild(overlay);

	const setGuardState = (active: boolean) => {
		document.documentElement.classList.toggle("devtools-guard-active", active);
	};

	const detectDevTools = () => {
		const threshold = 160;
		const widthGap = window.outerWidth - window.innerWidth;
		const heightGap = window.outerHeight - window.innerHeight;
		setGuardState(widthGap > threshold || heightGap > threshold);
	};

	window.addEventListener("contextmenu", (event) => {
		event.preventDefault();
	});

	window.addEventListener("keydown", (event) => {
		const key = event.key.toLowerCase();

		if (event.key === "F12") {
			event.preventDefault();
			return;
		}

		if (event.ctrlKey && event.shiftKey && blockedCombos.has(key)) {
			event.preventDefault();
			return;
		}

		if (event.ctrlKey && !event.shiftKey && key === "u") {
			event.preventDefault();
		}
	});

	window.addEventListener("resize", detectDevTools);
	window.setInterval(detectDevTools, 1200);
	detectDevTools();
}

installProductionGuards();

createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
		<App />
	</ThemeProvider>
);
