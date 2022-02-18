import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
import createComponent from './lib/templates/createComponent';
import createCssModule from './lib/templates/createCssModule';
import * as validate from './lib/validate';



export async function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('create-component-react-vscode.createComponent', async ({ path: currPath }: { path: string }) => {
		const workspaceFolders: string = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.path : ''

		const componentName = await vscode.window.showInputBox({
			prompt: `Component will be created at ${currPath.replace(workspaceFolders, '')}`,
			placeHolder: "Enter Component Name",
			validateInput: validate.componentName,
			ignoreFocusOut: true,
		})
		if (!componentName) return

		const rawOptions = await vscode.window.showQuickPick([{ label: "css module", value: 'cssModule' }], { canPickMany: true, placeHolder: 'Select options', })
		const pathFolderComponent = path.join(currPath, componentName)
		const options = {
			cssModule: rawOptions ? !!rawOptions[0] : false
		}

		fs.mkdirSync(pathFolderComponent)
		//create component file
		fs.writeFileSync(
			path.join(pathFolderComponent, componentName + '.tsx'),
			createComponent({
				name: componentName,
				cssModule: options.cssModule
			})
		)
		//create css file
		if (options.cssModule)
			fs.writeFileSync(
				path.join(pathFolderComponent, componentName + '.module.css'),
				createCssModule({
					name: componentName,
				})
			)
	}))
}