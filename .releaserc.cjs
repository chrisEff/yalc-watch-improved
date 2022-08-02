module.exports = {
	branches: ['main', { name: 'alpha', prerelease: true }, { name: 'beta', prerelease: true }],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ breaking: true, release: 'major' },
					{ type: 'feat', release: 'minor' },
					{ type: 'fix', release: 'patch' },
					{ type: 'perf', release: 'patch' },
					{ type: 'build', release: 'patch' },
					{ type: 'revert', release: 'patch' },
				],
				parserOpts: {
					noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
				},
			},
		],
		[
			'@semantic-release/release-notes-generator',
			{
				linkCompare: false,
				linkReferences: false,
				preset: 'conventionalcommits',
				presetConfig: {
					types: [
						{ type: 'feat', section: 'Features' },
						{ type: 'fix', section: 'Bug Fixes' },
						{ type: 'docs', section: 'Documentation' },
						{ type: 'perf', section: 'Performance Improvements' },
						{ type: 'build', section: 'Build System and Dependencies' },
						{ type: 'refactor', section: 'Code Refactoring' },
						{ type: 'revert', section: 'Reverts' },
					],
				},
			},
		],
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/git',
		'@semantic-release/github',
	],
}
