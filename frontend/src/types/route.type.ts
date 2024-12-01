
export type RouteType = {
    route: string,
    useLayout: string,
    load(): void,
    styles: string[],
    title: string,
    scripts: string[],
    filePathTemplate: string
}[]