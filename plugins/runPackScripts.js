import { exec } from 'child_process';
import glob from 'glob';
import { promisify } from 'util';

const execAsync = promisify(exec);

function runPackScripts(options = {}) {
  const { packPath = './lib/pack' } = options;

  return {
    name: 'run-pack-scripts',
    async buildStart() {
      console.log('Run pack scripts start');
      // Find all JavaScript files in the specified path
      const jsFiles = glob.sync(`${packPath}/**/*.js`, {
        nodir: true,
      });

      console.log(`Found ${jsFiles.length} JavaScript files in ${packPath}`);
      // Execute each JavaScript file
      for (const file of jsFiles) {
        try {
          console.log(`Executing: ${file}`);
          // Execute the JavaScript file with the source file path as an environment variable
          // Using Windows-compatible environment variable syntax
          const { stdout, stderr } = await execAsync(`set SOURCE_FILE_PATH=${file} && node ${file}`);

          if (stderr) {
            console.error('STDERR:', stderr);
          }
          console.log('STDOUT >\n', stdout);

          console.log(`Successfully executed: ${file}`);
        } catch (error) {
          console.error(`Error executing ${file}:`, error);
        }
      }
      console.log('Run pack scripts complete');
    },
  };
}

export default runPackScripts;
