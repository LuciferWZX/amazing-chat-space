export function InlineChromiumBugFix() {
  return (
    <span contentEditable={false} className="text-0">
      {String.fromCodePoint(160)}
    </span>
  )
}
