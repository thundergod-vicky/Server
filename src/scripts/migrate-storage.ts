import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = 'course-content';

const awsRegion = process.env.AWS_S3_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsBucketName = process.env.AWS_S3_BUCKET_NAME;

if (!supabaseUrl || !supabaseKey || !awsRegion || !awsAccessKeyId || !awsSecretAccessKey || !awsBucketName) {
  console.error('Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

async function migrate() {
  console.log('--- Starting Storage Migration (Supabase -> S3) ---');
  
  // List files in Supabase bucket
  // Note: listing files in Supabase can be tricky if they are deep. 
  // We'll try to list recursively if possible, or iterate through folders.
  // For simplicity, we'll start with 'uploads/' folder which is common.
  
  const folders = ['', 'uploads/']; // Add more if needed
  
  for (const folder of folders) {
    console.log(`Listing files in folder: ${folder || 'root'}...`);
    
    const { data: files, error } = await supabase.storage
      .from(supabaseBucket)
      .list(folder, { limit: 1000 });

    if (error) {
      console.error(`Error listing files in ${folder}:`, error.message);
      continue;
    }

    if (!files || files.length === 0) {
      console.log(`No files found in ${folder}.`);
      continue;
    }

    console.log(`Found ${files.length} items in ${folder}.`);

    for (const file of files) {
      // Skip folders
      if (!file.id) {
        // If file has no ID, it might be a folder in Supabase list
        // Note: Supabase list returns objects with metadata if it's a file
        if (!file.metadata) {
            console.log(`Skipping potential folder or empty item: ${file.name}`);
            continue;
        }
      }

      const filePath = folder ? `${folder}${file.name}` : file.name;
      
      console.log(`Migrating: ${filePath}...`);

      try {
        // 1. Download from Supabase
        const { data: blob, error: downloadError } = await supabase.storage
          .from(supabaseBucket)
          .download(filePath);

        if (downloadError) {
          console.error(`  [FAILED] Download error for ${filePath}:`, downloadError.message);
          continue;
        }

        // 2. Convert Blob to Buffer for S3
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. Upload to S3
        const uploadCommand = new PutObjectCommand({
          Bucket: awsBucketName,
          Key: filePath,
          Body: buffer,
          ContentType: blob.type || 'application/octet-stream',
        });

        await s3Client.send(uploadCommand);
        console.log(`  [SUCCESS] Migrated ${filePath} to S3.`);
      } catch (err) {
        console.error(`  [ERROR] Failed to migrate ${filePath}:`, err.message);
      }
    }
  }

  console.log('--- Migration Complete ---');
}

migrate().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
