import { supabase } from './supabaseClient';

export const getUserAndSearch = async () => {
    try {
        // Retrieve the logged-in user's session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error('Error fetching user or user not logged in:', userError);
            throw new Error('User is not authenticated');
        }

        // Get the logged-in user's email
        const email = user.email;
        console.log('Logged-in user email:', email);

        // Search the `users` table for the user's details using the email
        const { data: userData, error: searchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single(); // Assuming one user per email

        if (searchError) {
            console.error('Error searching users table:', searchError);
            throw new Error('Failed to fetch user details from the database');
        }

        console.log('Fetched user details:', userData);
        return userData;
        
    } catch (error) {
        console.error('Error in getUserAndSearch function:', error.message);
        throw new Error('Failed to fetch user details');
    }
};
