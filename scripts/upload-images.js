import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
// For storage, using the anon key might fail if RLS policies only allow authenticated uploads. 
// BUT wait, we just set the policy to 'authenticated'. The anon key belongs to the 'anon' role, NOT 'authenticated'.
// To bypass this for our admin script, we should use the SERVICE ROLE KEY if available, or we can temporarily
// just let anon upload, but we'll try to use the anon key. If it fails due to RLS, we'll log it.
// Actually, let's use the anon key if we can login. Wait, the user might not have a service token in .env.
// Let's modify the script to tell us if we get an RLS error.

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getMimeType = (ext) => {
  ext = ext.toLowerCase();
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'application/octet-stream';
}

async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function uploadImages() {
  const assetsPath = path.resolve(process.cwd(), "public", "assets");
  
  try {
    console.log(`Scanning for images in ${assetsPath}...`);
    
    for await (const filePath of getFiles(assetsPath)) {
      // Calculate relative path for bucket (e.g. shared/desktop/image.jpg)
      const relativePath = path.relative(assetsPath, filePath);
      // normalize windows paths to standard URL paths structure
      const remotePath = relativePath.split(path.sep).join('/');
      
      const fileExt = path.extname(filePath);
      const contentType = getMimeType(fileExt);

      // Read file into Buffer
      const fileBuffer = await fs.readFile(filePath);

      console.log(`Uploading ${remotePath} (${contentType})...`);
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(remotePath, fileBuffer, {
          contentType: contentType,
          upsert: true, // Overwrite if already exists
        });

      if (error) {
        console.error(`❌ Failed to upload ${remotePath}:`, error.message);
      } else {
        console.log(`✅ Uploaded ${remotePath}`);
      }
    }
    
    console.log("\n🎉 All uploads finished!");

  } catch (error) {
    console.error("An error occurred during upload:", error);
  }
}

uploadImages();
