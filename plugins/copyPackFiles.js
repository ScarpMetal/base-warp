import { promises as fs } from 'fs';
import glob from 'glob';
import path from 'path';

function copyMinecraftPackFiles() {
  return {
    name: 'copy-minecraft-pack-files',
    async buildStart() {
      console.log('Copy Minecraft Pack Files start');
      // Create base directories
      await fs.mkdir('dist/ResourcePack/assets', { recursive: true });
      await fs.mkdir('dist/DataPack/data', { recursive: true });

      // Copy ResourcePack files (assets and .mcassetsroot)
      const resourcePackFiles = glob.sync(
        'src/pack/{assets/**/*,.mcassetsroot}',
        {
          ignore: '**/*.ts',
          nodir: true,
        }
      );
      await Promise.all(
        resourcePackFiles.map(async (file) => {
          const relativePath = path.relative('src/pack', file);
          const destPath = path.join('dist/ResourcePack', relativePath);

          await fs.mkdir(path.dirname(destPath), { recursive: true });
          await fs.copyFile(file, destPath);
        })
      );

      // Copy DataPack files
      const dataFiles = glob.sync('src/pack/data/**/*', {
        ignore: '**/*.ts',
        nodir: true,
      });
      await Promise.all(
        dataFiles.map(async (file) => {
          const relativePath = path.relative('src/pack/data', file);
          const destPath = path.join('dist/DataPack/data', relativePath);

          await fs.mkdir(path.dirname(destPath), { recursive: true });
          await fs.copyFile(file, destPath);
        })
      );

      // Handle pack.mcmeta
      try {
        const sourcePath = path.join('src/pack', 'pack.mcmeta');
        await fs.access(sourcePath);

        // Read and parse the original pack.mcmeta
        const originalContent = await fs.readFile(sourcePath, 'utf8');
        const packMeta = JSON.parse(originalContent);

        // Modify the pack.mcmeta for ResourcePack
        const resourcePackMeta = {
          ...packMeta,
          ...(packMeta.pack && {
            pack: {
              ...packMeta.pack,
              description: `${packMeta.pack.description} ResourcePack`,
            },
          }),
        };

        // Copy to ResourcePack
        await fs.writeFile(
          path.join('dist/ResourcePack', 'pack.mcmeta'),
          JSON.stringify(resourcePackMeta, null, 2)
        );

        // Modify the pack.mcmeta for DataPack
        const dataPackMeta = {
          ...packMeta,
          ...(packMeta.pack && {
            pack: {
              ...packMeta.pack,
              description: `${packMeta.pack.description} DataPack`,
            },
          }),
        };

        // Copy to DataPack
        await fs.writeFile(
          path.join('dist/DataPack', 'pack.mcmeta'),
          JSON.stringify(dataPackMeta, null, 2)
        );
      } catch (err) {
        console.log("Skipping pack.mcmeta as it doesn't exist in src/pack/");
      }

      // Copy pack.png to both ResourcePack and DataPack
      try {
        const sourcePath = path.join('src/pack', 'pack.png');
        await fs.access(sourcePath);
        await fs.copyFile(
          sourcePath,
          path.join('dist/ResourcePack', 'pack.png')
        );
        await fs.copyFile(sourcePath, path.join('dist/DataPack', 'pack.png'));
      } catch (err) {
        console.log("Skipping pack.png as it doesn't exist in src/pack/");
      }
      console.log('Copy Minecraft Pack Files complete');
    },
  };
}

export default copyMinecraftPackFiles;
