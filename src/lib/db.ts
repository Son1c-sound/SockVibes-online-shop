import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://bzcunwwbzgourrfqjmlq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Y3Vud3diemdvdXJyZnFqbWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3NTc5NTQsImV4cCI6MjAzNzMzMzk1NH0.8HaGN1OBNYuXdVSTnew62XfIrLJZeG3GQgItKyDcCjs'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase