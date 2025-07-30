import { ThemeProvider, useTheme } from "@amazing-chat/ui";
import type { ReactNode } from "react";

interface EntryWithThemeProps {
	children: ReactNode;
}
const EntryWithTheme = ({ children }: EntryWithThemeProps) => {
	const { theme } = useTheme();
	console.warn("theme", theme);
	return (
		<ThemeProvider
			storageKey={"amazing-theme"}
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
			{children}
		</ThemeProvider>
	);
};

export default EntryWithTheme;
