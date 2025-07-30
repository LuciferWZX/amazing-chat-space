import EntryWithTheme from "./EntryWithTheme";

function Entry() {
	return (
		<EntryWithTheme>
			<div className="bg-muted p-4">
				<p>This is a chat application</p>
				<h1>Amazing Chat</h1>
			</div>
		</EntryWithTheme>
	);
}

export default Entry;
