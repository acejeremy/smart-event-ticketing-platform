const mongoose = require('mongoose');

// TODO (team): design the fields for this schema to satisfy "Contact
// Management System" / "Contact / Enquiry Management Page" from the
// brief. Think about:
//   - name, email, message
//   - optional: user (ref to User, if the enquiry came from a logged-in
//     user) vs allowing anonymous/guest enquiries
//   - status (e.g. 'new', 'read', 'resolved') so admins can manage them
//   - timestamps
const enquirySchema = new mongoose.Schema(
  {
    // fields go here
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
