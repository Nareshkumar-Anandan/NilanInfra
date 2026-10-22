import { initDatabase } from '../config/db.js';

console.log('🌱 Seeding Nilan Infra data...');

initDatabase().then(() => {
  console.log('✅ Seed check completed.');
  process.exit(0);
}).catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
