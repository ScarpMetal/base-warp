import * as fs from 'fs';
import * as path from 'path';

export function createCommand(command: string): void {
  // Get the source file path from environment variable
  const sourcePath = process.env.SOURCE_FILE_PATH;
  console.log('Original sourcePath:', sourcePath);

  if (!sourcePath) {
    throw new Error(
      'SOURCE_FILE_PATH environment variable is required but was not provided'
    );
  }

  // Normalize the path separators to forward slashes for consistent replacement
  const normalizedPath = sourcePath.replace(/\\/g, '/');
  console.log('Normalized path:', normalizedPath);

  // Parse the path to get its components
  const parsedPath = path.parse(normalizedPath);

  // Replace the path components
  const outputPath = normalizedPath
    .replace(/lib\/pack\//g, 'dist/DataPack/')
    .replace(parsedPath.ext, '.mcfunction');
  console.log('After replacements:', outputPath);

  // Ensure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Append the command to the file
  fs.appendFileSync(outputPath, command + '\n');
}
