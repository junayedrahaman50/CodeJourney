import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const WaitList = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storedEmails = JSON.parse(
      localStorage.getItem("submittedEmails") || "[]"
    );
    setSubmittedEmails(storedEmails);

    const storedSubmissionStatus =
      localStorage.getItem("isSubmitted") === "true";
    setIsSubmitted(storedSubmissionStatus);
  }, []);

  const sendConfirmationEmail = (userEmail) => {
    return emailjs.send(
      "service_rp732ya",
      "template_rhzhuwl",
      {
        to_email: userEmail,
        to_name: userEmail.split("@")[0], // Using part of email as name
      },
      "WL1iy6oi-x5JImc3Z"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittedEmails.includes(email)) {
      setStatus("This email has already been submitted.");
      return;
    }

    setStatus("Sending...");

    try {
      // Send notification to admin
      await emailjs.send(
        "service_rp732ya",
        "template_kiw5k3l",
        {
          from_name: "Waitlist User",
          email: email,
          reply_to: email,
        },
        "WL1iy6oi-x5JImc3Z"
      );

      // Send confirmation to user
      await sendConfirmationEmail(email);

      console.log("Both emails sent successfully");
      setStatus(
        "Success! You've been added to the waitlist. Check your email for confirmation."
      );

      const newSubmittedEmails = [...submittedEmails, email];
      setSubmittedEmails(newSubmittedEmails);
      localStorage.setItem(
        "submittedEmails",
        JSON.stringify(newSubmittedEmails)
      );

      // Set and store submission status
      setIsSubmitted(true);
      localStorage.setItem("isSubmitted", "true");

      setEmail("");
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div className="waitlist-container mt-lg">
      <div className="waitlist-card">
        <h2 className="waitlist-title">Join our waitlist</h2>
        {!isSubmitted ? (
          <>
            <p className="waitlist-sub-text">
              Be the first to know when we launch!
            </p>
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <input
                className="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button
                className="btn-primary btn-primary--waitlist"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <p className="success-message">
            Thank you for joining our waitlist! We'll keep you updated on our
            launch.
          </p>
        )}
        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
};

export default WaitList;
