// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlpubqduegguuqeheysx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscHVicWR1ZWdndXVxZWhleXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NDgwMjQsImV4cCI6MjA0OTMyNDAyNH0.uOcfQZ42ivkvSUM3zVGwAnCoi6Gi1-35Mq9Q6cu6HjM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
