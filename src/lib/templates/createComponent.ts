export default function createComponent({ name, cssModule }: { cssModule?: boolean, name: string }) {
    return `
import React from 'react'
${cssModule ? `import styles from './${name}.module.css'` : ''}

interface ${name}Props {
    className?: string
}
    
export function ${name}({className}: ${name}Props) {
    return (
        <div className={\`${cssModule ? `\${styles.${name}}` : ''}\${className ? ' ' + className : ''}\`}>
    
        </div>
    )
}
    `.replace(/\n{3,}/g, '\n\n').trim()
} 