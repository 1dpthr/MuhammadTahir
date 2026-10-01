import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` emits RELATIVE asset paths ("./assets/index-xxx.js") instead of
// an absolute "/MuhammadTahir/..." prefix.
//
// This matters for GitHub Pages project sites, which are served from
// https://<user>.github.io/<REPO_NAME>/. A hardcoded base bakes the old repo
// name into every asset URL, so renaming or recreating the repo 404s every
// asset and the page renders black. Relative paths resolve against whatever
// path the site is served from, so any repo name works with no config change.
//
// The app uses HashRouter, so all navigation is client-side via "#" and never
// depends on server-side path resolution — relative bases are safe here.
//
// Override with BASE_PATH if you ever need an explicit prefix:
//   BASE_PATH=/my-repo/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH || './',
  plugins: [react()],
})