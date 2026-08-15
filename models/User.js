const mongoose = require('mongoose');

// TODO (team): design the fields for this schema. At minimum you need
// enough to satisfy "User Authentication" (registration, login, hashed
// passwords, role-based access) from the brief. Think about:
//   - name / email (unique, required)
//   - password (hashed with bcrypt before save — never store plain text)
//   - role: 'admin' | 'user', default 'user'
//   - timestamps
const userSchema = new mongoose.Schema(
  {
    // fields go here
  },
  { timestamps: true }
);

// TODO (team): add a pre('save') hook that hashes the password with
// bcrypt whenever it's new or modified, and a comparePassword instance
// method the auth controller can call at login.

module.exports = mongoose.model('User', userSchema);
