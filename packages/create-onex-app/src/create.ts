import { welcomeMessage, successMessage } from './messages'
import { gatherOptions } from './prompts'
import { scaffold } from './scaffold'

/**
 * Main create flow — orchestrates prompts, scaffolding, and messaging.
 *
 * @param projectName - Optional project name from CLI argument
 */
export async function create(projectName?: string): Promise<void> {
  welcomeMessage()

  // Gather all project options via interactive prompts
  const options = await gatherOptions(projectName)

  // Scaffold the project
  await scaffold(options)

  // Print success message with next steps
  successMessage(options)
}
