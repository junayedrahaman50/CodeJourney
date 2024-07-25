const welcomeMessage = `
Hey there, code explorer! 👋 Ready to embark on an epic coding adventure? 🧭💻
<br><br>
CodeJourney is your trusty sidekick 🦸‍♂️ in tracking your daily coding quests! Whether you're a newbie learning the ropes 🎓 or a seasoned dev conquering projects 🏆, we've got your back!
<br><br>
<strong>Here's what you can do:</strong><br>
📝 Create awesome posts about your coding feats<br>
🗒️ Jot down genius ideas and notes<br>
📣 Show off your progress on social media (bragging rights, activated! 😎)<br>
<br>
⬆️ Watch this quick <a href="https://youtu.be/2j75Xy5Gsy0" target="_blank">video</a> to get started! 🎥<br><br>
`;

const WelcomeMessage = ({ closeModal }) => {
  return (
    <>
      <div className="modal animate__animated animate__fadeIn">
        <button onClick={closeModal} className="close-modal">
          &times;
        </button>
        <h2 className="title">Welcome to CodeJourney, fellow coder! 🎉</h2>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: welcomeMessage }}
        />
      </div>
      <div
        onClick={closeModal}
        className="overlay animate__animated animate__fadeIn"
      ></div>
    </>
  );
};

export default WelcomeMessage;
