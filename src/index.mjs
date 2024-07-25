#!/usr/bin/env node
import nodemon from 'nodemon'
import concurrently from 'concurrently'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

// Get package.json contents
const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

// Get the yalcWatch section (if it exists)

const config = packageJson.yalcWatch || {}

// prettier-ignore
const {
	buildWatchCommand = 'yarn watch',
	extensions = 'js,jsx,ts,tsx,json',
	watchFolder = 'build',
} = config

nodemon({
	watch: [watchFolder],
	ext: extensions,
	exec: 'yalc push --changed',
})

nodemon
	.on('start', function () {
		console.log(`${chalk.magentaBright('yalc-watch has started')}`)
	})
	.on('quit', function () {
		process.exit()
	})
	.on('restart', function (files) {
		console.log(chalk.blueBright('Found changes in files:', chalk.magentaBright(files)))
		console.log(chalk.blueBright('Trying to push new yalc package...'))
	})

if (buildWatchCommand) {
	concurrently([buildWatchCommand])
}
