# BaseWarp

A TypeScript-based Minecraft pack generator that allows you to write both datapacks and resourcepacks in TypeScript and compile them into their respective formats. It provides utilities for creating commands and managing pack structures, making it easier to develop complex Minecraft content with the benefits of TypeScript's type safety and modern development features.

### Features

- Write Minecraft datapacks and resourcepacks using TypeScript
- Automatic compilation to `.mcfunction` files and resourcepack assets
- Built-in command creation utilities
- Directory structure management for both pack types
- Single source of truth for pack development
- TypeScript type safety and IntelliSense support

## Usage

```
pnpm install
pnpm build
```

Resource pack will be at `dist/ResourcePack` and data pack will be at `dist/DataPack` after building.

The packs can then be copied to your Minecraft world's datapacks and resourcepacks folders respectively.
