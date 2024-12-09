import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Nav } from '../components';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Add success state

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setError(''); // Clear error when password changes
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError(''); // Clear error when password changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setSuccess(true); // Set success to true
    // If passwords match, you would typically make an API call here to update the password.
    // For this example, we'll just log the new password and redirect to the login page.
    console.log('New password:', newPassword);

  };
  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (success) { // Render only the success message and button if successful
    return (
      <div>
        <Loader />
        <Nav />
        <div className="relative min-h-screen bg-gray-100">
          <div className="absolute top-1/4 left-0 w-full text-center">
            <span className="text-green-500 text-4xl font-bold">Password changed successfully!</span>
          </div>

          <div className="flex items-center justify-center min-h-screen">
            <button
              onClick={handleGoToLogin}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>

    );
  }
  return (
    <div>
      <Loader />
      <Nav />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="reset-password-container max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
            { }

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="w-full border border-gray-400 px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full border border-gray-400 px-3 py-2 rounded"
                />
              </div>
              <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};