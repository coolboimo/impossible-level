const fs = require('fs');
const terser = require('terser');

(async () => {
  try {
    const code = fs.readFileSync('./scripts/contactmods.js', 'utf8');
    const result = await terser.minify(code, {
      compress: true,
      mangle: true,
    });
    
    if (result.error) {
      throw result.error;
    }
    
    fs.writeFileSync('output.min.js', result.code);
    console.log('Minification complete!');
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  }
})();
