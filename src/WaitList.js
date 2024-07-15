import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const WaitList = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([]);

  useEffect(() => {
    const storedEmails = JSON.parse(
      localStorage.getItem("submittedEmails") || "[]"
    );
    setSubmittedEmails(storedEmails);
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

      setEmail("");
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div className="waitlist-signup">
      <h2>Join Our Waitlist</h2>
      <p>Be the first to know when we launch!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button disabled={true} type="submit">
          Sign Up
        </button>
      </form>
      {status && <p className="status-message">{status}</p>}

      <style>{`
        .waitlist-signup {
          font-family: Arial, sans-serif;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #333;
          margin-bottom: 10px;
        }

        p {
          color: #666;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input[type="email"] {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }

        .status-message {
          margin-top: 15px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default WaitList;
