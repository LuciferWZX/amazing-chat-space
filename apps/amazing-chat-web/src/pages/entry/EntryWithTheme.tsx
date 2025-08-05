import { ThemeProvider, Toaster, useTheme } from "@amazing-chat/ui";
import type { ReactNode } from "react";

interface EntryWithThemeProps {
	children: ReactNode;
}
const EntryWithTheme = ({ children }: EntryWithThemeProps) => {
	const { theme } = useTheme();

	return (
		<ThemeProvider
			storageKey={"amazing-theme"}
			attribute="class"
			defaultTheme={theme}
			enableSystem
		>
			{children}
			<Toaster
				position={"top-center"}
				richColors={true}
				className="flex justify-center"
				toastOptions={{
					style: {
						padding: "8px 16px",
						width: "fit-content",
						height: "unset",
					},
				}}
				//"--error-bg": "bg-dark",
				// 		// "--error-border": "bg-dark",
				// 		// "--error-text": "bg-dark",
				// 		//
				// 		// "--warning-bg":
				// 		// 	"color-mix(in srgb, var(--warning) 10%, transparent)",
				// 		// "--warning-border": "var(--warning)",
				// 		// "--warning-text": "var(--warning)",
				// 		//
				// 		// "--error-bg":
				// 		// 	"color-mix(in srgb, var(--destructive) 10%, transparent)",
				// 		// "--error-border": "var(--destructive)",
				// 		// "--error-text": "var(--destructive-foreground)",
				// 		//
				// 		// "--success-bg":
				// 		// 	"color-mix(in srgb, var(--primary) 10%, transparent)",
				// 		// "--success-border": "var(--primary)",
				// 		// "--success-text": "var(--primary-foreground)",
				// 	} as CSSProperties
				// }
			/>
		</ThemeProvider>
	);
};

export default EntryWithTheme;
