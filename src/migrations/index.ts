import * as migration_20251226_203512 from './20251226_203512';
import * as migration_20251226_212510 from './20251226_212510';
import * as migration_20251226_213441 from './20251226_213441';
import * as migration_20251226_213834 from './20251226_213834';

export const migrations = [
  {
    up: migration_20251226_203512.up,
    down: migration_20251226_203512.down,
    name: '20251226_203512',
  },
  {
    up: migration_20251226_212510.up,
    down: migration_20251226_212510.down,
    name: '20251226_212510',
  },
  {
    up: migration_20251226_213441.up,
    down: migration_20251226_213441.down,
    name: '20251226_213441',
  },
  {
    up: migration_20251226_213834.up,
    down: migration_20251226_213834.down,
    name: '20251226_213834'
  },
];
