// Standalone Supabase Configuration
// Using the NEW project credentials provided
const supabaseUrl = 'https://eraymbgkdujqalosvclz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYXltYmdrZHVqcWFsb3N2Y2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNDc1NjgsImV4cCI6MjA5MzgyMzU2OH0.zPk2klS2v-A_7SVpZt_DXJhTQMt0e37fNykuwOdYpY0'; 

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
window.supabaseClient = _supabase;
