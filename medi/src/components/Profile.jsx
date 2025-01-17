import React, { useEffect, useState } from 'react';
import './Profile.css';
import { supabase } from './supabaseClient'; // Import Supabase instance
import { getUserAndSearch } from './getUserAndSearch';

const Profile = () => {
    const [user, setUser] = useState(null); // Holds user details
    const [isLoading, setIsLoading] = useState(true); // Indicates loading state
    const [isEditMode, setIsEditMode] = useState(false); // Toggles between edit and view modes

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await getUserAndSearch();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('users')
                .update({
                    age: user.age,
                    phone_number: user.phone_number,
                    gender: user.gender,
                    address: user.address,
                })
                .eq('id', user.id);

            if (error) {
                console.error('Error updating user details:', error);
                alert('Failed to update user details');
            } else {
                alert('User details updated successfully');
                setIsEditMode(false); // Exit edit mode
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error.message);
            alert('Error saving user details');
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return <div className="error">Failed to load user details</div>;
    }

    return (
        <div className = "every" >
        <div className="profile-container">
            <h1 className="profile-header">User Profile</h1>
            <div className="profile-card">
                {!isEditMode ? (
                    <div className="profile-details">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Age:</strong> {user.age || 'Not provided'}</p>
                        <p><strong>Gender:</strong> {user.gender || 'Not provided'}</p>
                        <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
                        <p><strong>Phone Number:</strong> {user.phone_number || 'Not provided'}</p>
                        <button
                            className="update-button"
                            onClick={() => setIsEditMode(true)}
                        >
                            Update Details
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={user.age || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your age"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone_number"
                                value={user.phone_number || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={user.gender || ''}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                value={user.address || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                                required
                            />
                        </div>
                        

                        <button type="submit" className="submit-button">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
        </div>
    );
};

export default Profile;
