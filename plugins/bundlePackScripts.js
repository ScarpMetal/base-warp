import { createFilter } from '@rollup/pluginutils';
import { readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { execSync } from 'child_process';
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default function bundlePackScripts(options = {}) {
  const {
    packPath = './src/pack',
    outputPath = './lib'
  } = options;

  const filter = createFilter([ '**/*.ts', '**/*.js' ]);
  const processedFiles = new Set();

  return {
    name: 'bundle-pack-scripts',
    async buildStart() {
      console.log('Bundle pack scripts start');
      const processDirectory = async (dir) => {
        const files = readdirSync(dir);

        for (const file of files) {
          const fullPath = join(dir, file);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            await processDirectory(fullPath);
          } else if (filter(fullPath)) {
            // If the file is in the pack directory, bundle it with its dependencies
            if (fullPath.startsWith(packPath)) {
              try {
                const bundle = await rollup({
                  input: fullPath,
                  plugins: [
                    typescript({
                      include: [ '**/*.ts' ],
                      exclude: [ 'node_modules/**' ],
                      moduleResolution: 'node',
                      allowSyntheticDefaultImports: true,
                      esModuleInterop: true
                    }),
                    {
                      name: 'resolve-relative',
                      resolveId(source) {
                        if (source.startsWith('.')) {
                          const resolved = join(dirname(fullPath), source);
                          // Try to resolve .ts extension if no extension is provided
                          if (!source.endsWith('.ts') && !source.endsWith('.js')) {
                            const tsPath = resolved + '.ts';
                            if (statSync(tsPath, { throwIfNoEntry: false })) {
                              return tsPath;
                            }
                          }
                          return resolved;
                        }
                        return null;
                      }
                    }
                  ]
                });

                const { output } = await bundle.generate({
                  format: 'esm',
                  dir: outputPath,
                  preserveModules: false
                });

                for (const chunk of output) {
                  const outputFile = join(outputPath, chunk.fileName);
                  await writeFile(outputFile, chunk.code);
                }
              } catch (error) {
                console.error(`Error bundling ${fullPath}:`, error);
              }
            } else {
              // For non-pack files, just transpile them
              if (file.endsWith('.ts')) {
                try {
                  execSync(`npx tsc --outDir ${outputPath} --module esnext --target esnext --moduleResolution node ${fullPath}`, { stdio: 'inherit' });
                } catch (error) {
                  console.error(`Error transpiling ${fullPath}:`, error);
                }
              }
            }

            processedFiles.add(fullPath);
          }
        }
      };

      await processDirectory(packPath);
      console.log('Bundle pack scripts complete');
    },

    watchChange(id) {
      if (filter(id) && !processedFiles.has(id)) {
        processedFiles.add(id);
      }
    }
  };
}
