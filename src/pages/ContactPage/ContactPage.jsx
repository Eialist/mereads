import "./contact-page.css";
import logo from "../../assets/Logos/mr-yellowgreen.png";
import { useState } from "react";
import { checkBadWords } from "../../hooksAndUtils/badWordFilter";

export const ContactPage = () => {
  const [contactMsg, setContactMsg] = useState({});
  const [msg, setMsg] = useState("");

  const sendContactRequest = async (e) => {
    e.preventDefault();
    console.log("sendMessage check");
    if (
      !contactMsg.topic ||
      !contactMsg.message ||
      !contactMsg.email ||
      !contactMsg.email.includes("@")
    ) {
      return setMsg("Fill out all the fields to send message");
    }

    let filteredMsg = checkBadWords(contactMsg.message);
    console.log(filteredMsg);
    if (filteredMsg) {
      console.log(filteredMsg);
      return setMsg(filteredMsg);
    }

    console.log(contactMsg);
    let headersList = { "Content-Type": "application/json" };
    let bodyContent = JSON.stringify(contactMsg);
    let res = await fetch("/api/contact/send", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await res.json();
    console.log(data);
    setMsg(data.msg);
    setContactMsg({
      topic: "",
      message: "",
      email: "",
    });
  };

  return (
    <div className="contact-container">
      <img src={logo} alt="" width="60px" />
      <h2>Contact</h2>
      <div className="contact-text-container">
        <p>
          Maybe you have spotted a bug, an error, or something that is not
          working quite right. Or perhaps you have a great idea for a new
          article topic?
        </p>
        <p>Feel free to reach out to MeReads here!</p>
      </div>
      <div>{msg}</div>
      <select
        name="topic"
        id="topic"
        className="contact-select"
        onChange={(e) =>
          setContactMsg({ ...contactMsg, topic: e.target.value })
        }>
        <option value="#"></option>
        <option value="language">Report Text Errors</option>
        <option value="bug">Report a Bug</option>
        <option value="suggestion">Suggest an Article Topic</option>
        <option value="feedback">Give Feedback</option>
        <option value="featureRequest">Submit a New Feature Idea</option>
      </select>
      <textarea
        className="contact-textarea"
        placeholder="Write message here.."
        onChange={(e) =>
          setContactMsg({ ...contactMsg, message: e.target.value })
        }></textarea>
      <input
        type="email"
        placeholder="Your E-mail"
        className="contact-input"
        onChange={(e) =>
          setContactMsg({ ...contactMsg, email: e.target.value })
        }
      />
      <div className="btn-container">
        <button className="contact-btn" onClick={sendContactRequest}>
          Send
        </button>
      </div>
    </div>
  );
};
