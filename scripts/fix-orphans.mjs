
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is missing in .env');
    process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
    console.log('🔧 Fixing Orphans...');

    try {
        // 1. Find orphans
        const orphans = await sql`
      SELECT id, raw_user_meta_data
      FROM auth.users
      WHERE id NOT IN (SELECT id FROM public.profiles)
    `;

        console.log(`Found ${orphans.length} orphans.`);

        for (const user of orphans) {
            const meta = user.raw_user_meta_data || {};
            const fullName = meta.full_name || meta.name || 'Unknown User';
            const avatarUrl = meta.avatar_url || meta.picture || '';

            console.log(`Creating profile for ${user.id} (${fullName})...`);

            await sql`
        INSERT INTO public.profiles (id, full_name, avatar_url)
        VALUES (${user.id}, ${fullName}, ${avatarUrl})
        ON CONFLICT (id) DO NOTHING
      `;
        }

        console.log('✅ Backfill complete.');

    } catch (err) {
        console.error('❌ Error executing fix:', err);
    } finally {
        await sql.end();
    }
}

main();
