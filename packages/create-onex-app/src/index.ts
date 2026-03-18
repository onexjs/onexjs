#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'

import { create } from './create'

const program = new Command()

program
  .name('create-onex-app')
  .description('Create a new OnexJS app — one codebase, every platform.')
  .version('0.1.0')
  .argument('[project-name]', 'Name of the project to create')
  .action(async (projectName?: string) => {
    try {
      await create(projectName)
      process.exit(0)
    } catch (err) {
      console.error()
      if (err instanceof Error) {
        console.error(chalk.red('Error: ') + err.message)
      } else {
        console.error(chalk.red('An unexpected error occurred.'))
      }
      process.exit(1)
    }
  })

program.parse()
