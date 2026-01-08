
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is missing in .env');
    process.exit(1);
}

const sql = postgres(connectionString);

async function main() {
    console.log('🔍 Checking Database State...');

    try {
        // 1. Check if profiles table exists
        const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'profiles';
    `;

        if (tables.length === 0) {
            console.error('❌ Table "profiles" DOES NOT exist in public schema.');
        } else {
            console.log('✅ Table "profiles" exists.');

            // 2. Count profiles
            const count = await sql`SELECT count(*) FROM public.profiles`;
            console.log(`📊 Total Profiles: ${count[0].count}`);

            // 3. List last 5 profiles
            const profiles = await sql`SELECT * FROM public.profiles ORDER BY updated_at DESC LIMIT 5`;
            console.log('Recent Profiles:', profiles);
        }

        // 4. Check for orphaned users (users in auth.users but not in public.profiles)
        try {
            const authUsers = await sql`SELECT count(*) FROM auth.users`;
            const userCount = authUsers[0].count;
            console.log(`👤 Total Auth Users: ${userCount}`);

            // Need to get profile count again properly as 'count' is available in scope
            const profileCount = await sql`SELECT count(*) FROM public.profiles`;
            const pCount = profileCount[0].count;

            if (userCount > pCount) {
                console.warn(`⚠️ Mismatch detected! ${userCount - pCount} users exist without profiles.`);
                console.log('   This likely happened if users signed up before the trigger was created.');
            } else {
                console.log('✅ User/Profile counts match (or profiles > users).');
            }

        } catch (e) {
            console.log('⚠️ Could not check auth.users (permission denied likely)');
        }

    } catch (err) {
        console.error('❌ Error executing diagnostic:', err);
    } finally {
        await sql.end();
    }
}

main();
