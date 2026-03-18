import chalk from 'chalk'
import prompts from 'prompts'

import { toSlug, isValidProjectName } from './utils'

export interface ProjectOptions {
  name: string
  slug: string
  platforms: ('mobile' | 'web' | 'desktop')[]
  mobilePlatforms?: ('ios' | 'android')[]
  webFramework?: 'nextjs' | 'vite'
  baseTemplate: 'expo' | 'nextjs' | 'vite'
  includeTauri: boolean
}

/**
 * Handle user cancellation — exit cleanly when the user presses Ctrl+C.
 */
function onCancel(): void {
  console.log()
  console.log(chalk.red('Cancelled.'))
  process.exit(1)
}

/**
 * Run all interactive prompts and return resolved ProjectOptions.
 *
 * @param initialName - Optional project name passed as CLI argument
 */
export async function gatherOptions(initialName?: string): Promise<ProjectOptions> {
  // 1. Project name
  let name = initialName ?? ''

  if (!name) {
    const response = await prompts(
      {
        type: 'text',
        name: 'name',
        message: 'Project name:',
        initial: 'my-app',
        validate: (value: string) => isValidProjectName(value),
      },
      { onCancel }
    )
    name = response.name as string
  } else {
    const validation = isValidProjectName(name)
    if (validation !== true) {
      console.log(chalk.red(validation))
      process.exit(1)
    }
  }

  const slug = toSlug(name)

  // 2. Platform selection
  const { platforms } = await prompts(
    {
      type: 'multiselect',
      name: 'platforms',
      message: 'Which platforms do you want to target?',
      choices: [
        { title: 'Mobile (iOS / Android)', value: 'mobile', selected: true },
        { title: 'Web', value: 'web', selected: true },
        { title: 'Desktop', value: 'desktop' },
      ],
      min: 1,
      hint: '- Space to select, Enter to confirm',
    },
    { onCancel }
  )

  // 3. If mobile selected, ask which mobile platforms
  let mobilePlatforms: ('ios' | 'android')[] | undefined
  if (platforms.includes('mobile')) {
    const { mobile } = await prompts(
      {
        type: 'multiselect',
        name: 'mobile',
        message: 'Which mobile platforms?',
        choices: [
          { title: 'iOS', value: 'ios', selected: true },
          { title: 'Android', value: 'android', selected: true },
        ],
        min: 1,
        hint: '- Space to select, Enter to confirm',
      },
      { onCancel }
    )
    mobilePlatforms = mobile
  }

  // 4. If web and/or desktop selected, but NOT mobile, ask web framework
  let webFramework: 'nextjs' | 'vite' | undefined
  const needsWebFramework =
    (platforms.includes('web') || platforms.includes('desktop')) && !platforms.includes('mobile')

  if (needsWebFramework) {
    const { framework } = await prompts(
      {
        type: 'select',
        name: 'framework',
        message: 'Which web framework?',
        choices: [
          { title: 'Next.js', value: 'nextjs' },
          { title: 'Vite', value: 'vite' },
        ],
      },
      { onCancel }
    )
    webFramework = framework
  }

  // 5. Compute baseTemplate and includeTauri
  let baseTemplate: 'expo' | 'nextjs' | 'vite'
  if (platforms.includes('mobile')) {
    // Mobile selected → always use expo (handles mobile + web)
    baseTemplate = 'expo'
  } else if (webFramework === 'nextjs') {
    baseTemplate = 'nextjs'
  } else {
    baseTemplate = 'vite'
  }

  const includeTauri = platforms.includes('desktop')

  return {
    name,
    slug,
    platforms,
    mobilePlatforms,
    webFramework,
    baseTemplate,
    includeTauri,
  }
}
