import React, { useState } from 'react';
import './ulogin.css';
import { supabase } from './supabaseClient';  // Make sure supabaseClient is set up correctly
import { useNavigate } from 'react-router-dom';

const ULoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSignIn = () => setIsSignIn(true);
    const handleSignUp = () => setIsSignIn(false);

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(`Login Error: ${error.message}`);
        } else {
            // After successful login, check if user exists in the 'users' table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('email', data.user.email)  // Ensure you're matching the email field
                .single();

            if (userError || !userData) {
                alert('No such user exists in the records.');
                await supabase.auth.signOut();  // Log out user immediately
            } else {
                alert(`Welcome,  ${data.user.email}`);
                navigate('/dashboard');
            }
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
    
        console.log('Signing up with email:', email);  // Log email for debugging
    
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },  // Save name in user metadata
            },
        });
    
        if (error) {
            console.log('Signup Error:', error);  // Log full error response from Supabase
            alert(`Signup Error: ${error.message}`);  // Show user-friendly error
        } else {
            // Insert the user data into the 'users' table
            const { error: insertError } = await supabase
                .from('users')  // Ensure this is the correct table name
                .insert([{ id: data.user.id, name, email }]);  // Insert user info (name, email)
    
            if (insertError) {
                alert(`Error saving data in users table: ${insertError.message}`);
            } else {
                alert(`Account created for: ${data.user.email}`);
                navigate('/dashboard');  // Navigate after successful signup
            }
        }    
    };

    return (
        <div className="eve">
            <div className={`plogin-container ${isSignIn ? '' : 'right-panel-active'}`}>
                {/* Sign In Form */}
                <div className="plogin-form-container plogin-sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1 className="plogin-h1">Log in </h1>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="ubutton" type="submit">Log In</button>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className="plogin-form-container plogin-sign-up-container">
                    <form onSubmit={handleSignup}>
                        <h1 className="plogin-h1">Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="ubutton"  type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Overlay to switch between Sign In and Sign Up */}
                <div className="plogin-overlay-container">
                    <div className="plogin-overlay">
                        <div className="plogin-overlay-panel plogin-overlay-right">
                            <h1 className="plogin-h1">Don't have an account?</h1>
                            <p>Sign up now and get started</p>
                            <button className="plogin-ghost ubutton" onClick={handleSignUp}>Sign Up</button>
                        </div>
                        <div className="plogin-overlay-panel plogin-overlay-left">
                            <h1 className="plogin-h1">Welcome Back!</h1>
                            <p>Log in with your credentials</p>
                            <button className="plogin-ghost ubutton" onClick={handleSignIn}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ULoginSignup;
