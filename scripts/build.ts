import { build } from 'esbuild'

const isDev = 'development' === process.env.NODE_ENV

build({
	entryPoints: ['src/index.tsx'],
	bundle: true,
	outdir: 'dist',
	minify: !isDev,
	sourcemap: isDev,
	platform: 'browser',
	define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
	tsconfig: 'tsconfig.json',
	inject: ['src/_import-preact.ts'],
	jsxFactory: 'h',
	jsxFragment: 'Fragment',
	watch: isDev,
}).catch(x => {
	console.error(x)
	process.exit(1)
})
