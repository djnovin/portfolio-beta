export const pushToDataLayer = (
    event: string,
    link?: string,
    text?: string
) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
        event,
        link,
        text
    })
}
