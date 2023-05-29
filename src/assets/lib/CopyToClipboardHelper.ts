export const CopyToClipboardHelper = (text: string) => {
    navigator.clipboard.writeText(text)
}