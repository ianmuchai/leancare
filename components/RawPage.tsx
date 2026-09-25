export function RawPage({ html }: { html: string }) {
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
