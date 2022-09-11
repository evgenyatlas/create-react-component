export default function createIndex(nameComponent: string) {
    return `export * from './${nameComponent}.tsx'`
}