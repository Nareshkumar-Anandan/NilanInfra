import { initDatabase } from '../config/db.js';

console.log('🔄 Initializing Nilan Infra MySQL Database...');

initDatabase().then((success) => {
  if (success) {
    console.log('🎉 Database initialization complete!');
  } else {
    console.log('⚠️  Database initialization encountered an error. Check MySQL service & credentials in .env');
  }
  process.exit(0);
}).catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
