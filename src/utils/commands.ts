// Minecraft literal value types
type Gamemode = 'survival' | 'creative' | 'adventure' | 'spectator';
type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';
type AdvancementAction = 'grant' | 'revoke' | 'test';
type DatapackAction = 'enable' | 'disable' | 'reload';

// Minecraft target types
type Selector = '@p' | '@a' | '@r' | '@e' | '@s';
type Target = Selector | string; // Player name, UUID, or Selector

// Common Minecraft values
type Ability = 'mayfly' | 'mute' | 'worldbuilder' | string;
type Effect =
  | 'speed'
  | 'slowness'
  | 'haste'
  | 'mining_fatigue'
  | 'strength'
  | 'instant_health'
  | 'instant_damage'
  | 'jump_boost'
  | 'nausea'
  | 'regeneration'
  | 'resistance'
  | 'fire_resistance'
  | 'water_breathing'
  | 'invisibility'
  | 'blindness'
  | 'night_vision'
  | 'hunger'
  | 'weakness'
  | 'poison'
  | 'wither'
  | 'health_boost'
  | 'absorption'
  | 'saturation'
  | 'glowing'
  | 'levitation'
  | 'luck'
  | 'unluck'
  | 'slow_falling'
  | 'conduit_power'
  | 'dolphins_grace'
  | 'bad_omen'
  | 'hero_of_the_village'
  | string;
type Enchantment =
  | 'protection'
  | 'fire_protection'
  | 'feather_falling'
  | 'blast_protection'
  | 'projectile_protection'
  | 'respiration'
  | 'aqua_affinity'
  | 'thorns'
  | 'depth_strider'
  | 'frost_walker'
  | 'binding_curse'
  | 'sharpness'
  | 'smite'
  | 'bane_of_arthropods'
  | 'knockback'
  | 'fire_aspect'
  | 'looting'
  | 'sweeping'
  | 'efficiency'
  | 'silk_touch'
  | 'unbreaking'
  | 'fortune'
  | 'power'
  | 'punch'
  | 'flame'
  | 'infinity'
  | 'luck_of_the_sea'
  | 'lure'
  | 'loyalty'
  | 'impaling'
  | 'riptide'
  | 'channeling'
  | 'multishot'
  | 'quick_charge'
  | 'piercing'
  | 'mending'
  | 'vanishing_curse'
  | string;
type Structure =
  | 'bastion_remnant'
  | 'buried_treasure'
  | 'desert_pyramid'
  | 'endcity'
  | 'fortress'
  | 'igloo'
  | 'jungle_pyramid'
  | 'mineshaft'
  | 'monument'
  | 'nether_fossil'
  | 'ocean_ruin'
  | 'pillager_outpost'
  | 'ruined_portal'
  | 'shipwreck'
  | 'stronghold'
  | 'swamp_hut'
  | 'village'
  | string;

export function ability(
  target: Target,
  ability: Ability,
  value: boolean
): string {
  const parts = ['ability', target, ability, value].filter(Boolean);
  return parts.join(' ');
}

export function advancement(
  action: AdvancementAction,
  target: Target,
  advancement: string
): string {
  const parts = ['advancement', action, target, advancement].filter(Boolean);
  return parts.join(' ');
}

export function ban(name: Target, reason?: string): string {
  const parts = ['ban', name, reason].filter(Boolean);
  return parts.join(' ');
}

export function clear(
  target: Target,
  item?: string,
  data?: number,
  maxCount?: number
): string {
  const parts = ['clear', target, item, data, maxCount].filter(Boolean);
  return parts.join(' ');
}

export function clone(
  begin: string,
  end: string,
  destination: string,
  maskMode?: 'replace' | 'masked' | 'filtered',
  cloneMode?: 'normal' | 'force' | 'move'
): string {
  const parts = ['clone', begin, end, destination, maskMode, cloneMode].filter(
    Boolean
  );
  return parts.join(' ');
}

export function data(target: Target, path: string, value: string): string {
  const parts = ['data', target, path, value].filter(Boolean);
  return parts.join(' ');
}

export function datapack(action: DatapackAction, name?: string): string {
  const parts = ['datapack', action, name].filter(Boolean);
  return parts.join(' ');
}

export function difficulty(difficulty: Difficulty): string {
  return `difficulty ${difficulty}`;
}

export function effect(
  target: Target,
  effect: Effect,
  seconds?: number,
  amplifier?: number,
  hideParticles?: boolean
): string {
  const parts = [
    'effect',
    target,
    effect,
    seconds,
    amplifier,
    hideParticles,
  ].filter(Boolean);
  return parts.join(' ');
}

export function enchant(
  target: Target,
  enchantment: Enchantment,
  level?: number
): string {
  const parts = ['enchant', target, enchantment, level].filter(Boolean);
  return parts.join(' ');
}

export function execute(as: Target, at: string, command: string): string {
  const parts = ['execute', as, at, command].filter(Boolean);
  return parts.join(' ');
}

export function fill(
  from: string,
  to: string,
  block: string,
  replace?: string
): string {
  const parts = ['fill', from, to, block, replace].filter(Boolean);
  return parts.join(' ');
}

export function gamemode(mode: Gamemode, target?: Target): string {
  const parts = ['gamemode', mode, target].filter(Boolean);
  return parts.join(' ');
}

export function gamerule(rule: string, value?: string): string {
  const parts = ['gamerule', rule, value].filter(Boolean);
  return parts.join(' ');
}

export function give(
  target: Target,
  item: string,
  count?: number,
  data?: number,
  nbt?: string
): string {
  const parts = ['give', target, item, count, data, nbt].filter(Boolean);
  return parts.join(' ');
}

export function kill(target: Target): string {
  return `kill ${target}`;
}

export function locate(structure: Structure): string {
  return `locate ${structure}`;
}
