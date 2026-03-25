import * as migration_20250404_082533 from './20250404_082533';

export const migrations = [
  {
    up: migration_20250404_082533.up,
    down: migration_20250404_082533.down,
    name: '20250404_082533',
  },
];
