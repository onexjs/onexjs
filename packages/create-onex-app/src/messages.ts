import chalk from 'chalk'

import type { ProjectOptions } from './prompts'

export function welcomeMessage(): void {
  console.log()
  console.log(chalk.bold('Create OnexJS App'))
  console.log(chalk.dim('One codebase. Every platform.'))
  console.log()
}

export function successMessage(options: ProjectOptions): void {
  const { slug, platforms, baseTemplate, includeTauri } = options

  console.log()
  console.log(chalk.green.bold('Success!') + ' Your project is ready.')
  console.log()
  console.log('  ' + chalk.cyan(`cd ${slug}`))
  console.log('  ' + chalk.cyan('pnpm install'))
  console.log()

  // Dev commands depend on selected platforms
  console.log(chalk.bold('Start developing:'))
  console.log()

  if (baseTemplate === 'expo') {
    if (platforms.includes('mobile') && platforms.includes('web')) {
      console.log(
        '  ' +
          chalk.cyan('pnpm dev') +
          chalk.dim('          # start Expo dev server (mobile + web)')
      )
    } else if (platforms.includes('mobile')) {
      console.log('  ' + chalk.cyan('pnpm dev') + chalk.dim('          # start Expo dev server'))
    } else {
      console.log('  ' + chalk.cyan('pnpm dev') + chalk.dim('          # start dev server'))
    }
  } else if (baseTemplate === 'nextjs') {
    console.log('  ' + chalk.cyan('pnpm dev') + chalk.dim('          # start Next.js dev server'))
  } else {
    console.log('  ' + chalk.cyan('pnpm dev') + chalk.dim('          # start Vite dev server'))
  }

  if (includeTauri) {
    console.log(
      '  ' + chalk.cyan('pnpm tauri dev') + chalk.dim('    # start desktop app (requires Rust)')
    )
  }

  console.log()

  // Platform summary
  const platformLabels: string[] = []
  if (platforms.includes('mobile')) {
    const mobileNames = (options.mobilePlatforms ?? ['ios', 'android']).map((p) =>
      p === 'ios' ? 'iOS' : 'Android'
    )
    platformLabels.push(...mobileNames)
  }
  if (platforms.includes('web')) {
    platformLabels.push('Web')
  }
  if (platforms.includes('desktop')) {
    platformLabels.push('Desktop')
  }

  console.log(chalk.dim('Platforms: ') + platformLabels.join(', '))
  console.log(chalk.dim('Template:  ') + baseTemplate + (includeTauri ? ' + tauri' : ''))
  console.log()
}
