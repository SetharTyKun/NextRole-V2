const { cpSync, existsSync } = require('fs')

const dirs = ['components', 'js', 'asset', 'pages']
dirs.forEach(dir => {
  if (existsSync(dir)) {
    cpSync(dir, `dist/${dir}`, { recursive: true })
    console.log(`Copied ${dir}/ → dist/${dir}/`)
  }
})
