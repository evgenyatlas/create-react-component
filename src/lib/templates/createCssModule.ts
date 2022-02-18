export default function createCssModule({ name }: { name: string }) {
    return `
.${name} {

}
`.trim()
}