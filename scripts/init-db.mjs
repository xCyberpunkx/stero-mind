
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

// Bun automatically loads .env

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is missing in .env');
    process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
    const sqlPath = path.join(process.cwd(), 'supabase', 'init_supabase.sql');
    console.log(`Reading SQL from ${sqlPath}...`);

    try {
        const query = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing SQL...');
        await sql.unsafe(query);

        console.log('✅ Database initialized successfully!');
    } catch (err) {
        console.error('❌ Error executing SQL:', err);
    } finally {
        await sql.end();
    }
}

main();
