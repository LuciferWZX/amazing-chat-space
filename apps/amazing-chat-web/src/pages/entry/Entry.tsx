import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EntryWithAuth from "./EntryWithAuth";
import EntryWithRouter from "./EntryWithRouter";
import EntryWithTheme from "./EntryWithTheme";

const queryClient = new QueryClient();
function Entry() {
	return (
		<QueryClientProvider client={queryClient}>
			<EntryWithTheme>
				<EntryWithAuth>
					<EntryWithRouter />
				</EntryWithAuth>
			</EntryWithTheme>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default Entry;
