/* 3. Fake Backend Logic */
const sendEmail = async (data) => {
    console.log(`Sending Email to ${data.to}`);

    /* Simulate delay */
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Email sent successfully");
}

module.exports = sendEmail;