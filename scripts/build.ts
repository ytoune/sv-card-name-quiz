import type { BuildOptions } from 'esbuild'
import { build, context } from 'esbuild'
import { cp } from 'node:fs/promises'
import { join } from 'node:path'

const isDev = 'development' === process.env.NODE_ENV

;(async () => {
  const root = join(__dirname, '..')
  await cp(join(root, 'statics'), join(root, 'dist'), { recursive: true })
  const config: BuildOptions = {
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
  }
  if (isDev) {
    const ctx = await context({ ...config })
    await ctx.watch()
  } else {
    await build({ ...config })
  }
})().catch(x => {
  console.error(x)
  process.exit(1)
})
