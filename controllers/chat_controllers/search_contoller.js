const User = require("../../models/user_model")


module.exports.search = async (req ,res)=>{
    try {
        // Extract username from route parameters
        const {username} = req.body;
    
        // Validate that username is provided
        if (!username) {
          return res.status(400).json({ message: 'Username is required' });
        }
    
        // Query the database for the user, excluding the password field
        const user = await User.find({ username }).select('-password');
    
        // Check if user exists
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Return the user details
        res.status(200).json({ user });
      } catch (error) {
        // Log the error for debugging and return a server error response
        console.error('Error searching for user:', error);
        res.status(500).json({ message: 'Server error' });
      }
}