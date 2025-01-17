import React, { useState } from 'react';
import './slogin.css';
import { supabase } from './supabaseClient';  // Make sure supabaseClient is set up correctly
import { useNavigate } from 'react-router-dom';

const StaffLoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSignIn = () => setIsSignIn(true);
    // const handleSignUp = () => setIsSignIn(false);

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
                .from('staffs')
                .select('id')
                .eq('email', data.user.email)  // Ensure you're matching the email field
                .single();

            if (userError || !userData) {
                alert('No such user exists in the records.');
                await supabase.auth.signOut();  // Log out user immediately
            } else {
                alert(`Welcome,  ${data.user.email}`);
                navigate('/staffdashboard');
            }
        }
    };

    // Handle Signup
    // const handleSignup = async (e) => {
    //     e.preventDefault();
    
    //     console.log('Signing up with email:', email);  // Log email for debugging
    
    //     const { data, error } = await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             data: { name },  // Save name in user metadata
    //         },
    //     });
    
    //     if (error) {
    //         console.log('Signup Error:', error);  // Log full error response from Supabase
    //         alert(`Signup Error: ${error.message}`);  // Show user-friendly error
    //     } else {
    //         // Insert the user data into the 'users' table
    //         const { error: insertError } = await supabase
    //             .from('staffs')  // Ensure this is the correct table name
    //             .insert([{ id: data.user.id, name, email }]);  // Insert user info (name, email)
    
    //         if (insertError) {
    //             alert(`Error saving data in users table: ${insertError.message}`);
    //         } else {
    //             alert(`Account created for: ${data.user.email}`);
    //             navigate('/staffdashboard');  // Navigate after successful signup
    //         }
    //     }    
    // };

    return (
        <div className="every">
            <div className={`slogin-container ${isSignIn ? '' : 'right-panel-active'}`}>
                {/* Sign In Form */}
                <div className="slogin-form-container slogin-sign-in-container">
                    <form onSubmit={handleLogin}>
                        {/* <h1 className="slogin-h1">Log in as <br></br>a Staff <br></br></h1> */}
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
                        <button className="sbutton" type="submit">Log In</button>
                    </form>
                </div>

                {/* Sign Up Form */}
                {/* <div className="slogin-form-container slogin-sign-up-container">
                    <form onSubmit={handleSignup}>
                        <h1 className="slogin-h1">Create Account</h1>
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
                        <button className="sbutton"  type="submit">Sign Up</button>
                    </form>
                </div> */}

                {/* Overlay to switch between Sign In and Sign Up */}
                <div className="slogin-overlay-container">
                    <div className="slogin-overlay">
                        <div className="slogin-overlay-panel slogin-overlay-right">
                            <h1 className="slogin-h1">Log in to<br></br>staff account </h1>
                            {/* <p>Sign up now and get started</p> */}
                            {/* <button className="slogin-ghost sbutton" onClick={handleSignUp}>Sign Up</button> */}
                        </div>
                        <div className="slogin-overlay-panel plogin-overlay-left">
                            <h1 className="slogin-h1">Welcome Back!</h1>
                            <p>Log in with your credentials</p>
                            <button className="slogin-ghost sbutton" onClick={handleSignIn}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffLoginSignup;
