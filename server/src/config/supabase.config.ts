import { createClient } from '@supabase/supabase-js'

import * as dotenv from "dotenv";
dotenv.config();

const appUrl = process.env.SUPABASE_URL ?? '';
const appSecret = process.env.SUPABASE_SERVICE_KEY ?? '';

export const supabase = createClient(appUrl, appSecret, {
  auth: { persistSession: false }
})