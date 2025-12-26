import * as migration_20251226_203512 from './20251226_203512';

export const migrations = [
  {
    up: migration_20251226_203512.up,
    down: migration_20251226_203512.down,
    name: '20251226_203512'
  },
];
