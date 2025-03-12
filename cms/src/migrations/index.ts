import * as migration_20250312_110845 from './20250312_110845';

export const migrations = [
  {
    up: migration_20250312_110845.up,
    down: migration_20250312_110845.down,
    name: '20250312_110845'
  },
];
