const nodemailer = require('nodemailer');
const axios = require('axios');

const getIndianTime = (utcDateString) => {
  const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  return indianDate;
}
// Function to send email notification
const sendNotificationEmail = async (req, res) => {
  try {
    const startTime = getIndianTime(req.body.contest.start_time);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Compose the email message
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.user.email,
      subject: 'Contest Notification',
      text: `Dear ${req.body.user.userName},\n\nThere is a contest coming up on ${req.body.contest.site} at ${startTime}. Don't forget to participate!\n\nBest regards,\nYour Contest Notifier`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${req.body.user.email}`);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

// Function to schedule contest notifications
const scheduleContestNotifications = async () => {
  try {
    const usersResponse = await axios.get('http://localhost:8000/api/users');
    const users = usersResponse.data;
    const contestsResponse = await axios.get('https://kontests.net/api/v1/all');
    const contests = contestsResponse.data;

    // Process contests and send notifications to registered users
    contests.forEach((contest) => {
      const prop = `${contest.site}` + "NotificationTime";
      users.forEach(async (user) => {
        const notificationTime = (prop === "CS Academy" || prop === "Toph" || prop === "CodeForces::Gym") ? 0 : user[prop];

        const contestStartTime = new Date(contest.start_time);

        if (notificationTime > 0) {
          // Convert minutes to milliseconds
          const notificationTimeMs = notificationTime * 60000;
          const notificationTimeMs2 = (notificationTime - 1) * 60000;
          const notificationTimestamp = contestStartTime.getTime() - notificationTimeMs;
          const notificationTimestamp2 = contestStartTime.getTime() - notificationTimeMs2;
          if (Date.now() >= notificationTimestamp && Date.now() < notificationTimestamp2) {
            await sendNotificationEmail({ body: { user, contest } });
          }
        }
      });
    });
  } catch (error) {
    console.error('Error scheduling contest notifications:', error);
  }
};

module.exports = {
  sendNotificationEmail,
  scheduleContestNotifications,
};
