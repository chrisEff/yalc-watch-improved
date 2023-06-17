#!/usr/bin/env node
import nodemon from 'nodemon'
import concurrently from 'concurrently'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

// Get package.json contents
const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

// Get the yalcWatch section (if it exists)
if (packageJson.yalcWatch) {
	const yalcWatch = packageJson.yalcWatch

	if (yalcWatch.watchFolder === undefined || yalcWatch.extensions === undefined) {
		throw new Error('Invalid yalc watch config: "' + JSON.stringify(yalcWatch) + '"')
	}

	nodemon({
		watch: [yalcWatch.watchFolder],
		ext: yalcWatch.extensions,
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

	if (yalcWatch.buildWatchCommand) {
		concurrently([yalcWatch.buildWatchCommand])
	}
} else {
	console.log(
		chalk.redBright('Error: yalc-watch could not find a yalcWatch section in your package.json file, exiting')
	)
}
