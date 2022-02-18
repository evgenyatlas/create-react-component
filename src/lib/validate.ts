export function componentName(componentName: string): string | null {
    if (!componentName || componentName === "") {
        return "Component name can not be empty";
    }
    return null;
}