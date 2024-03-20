import React from "react";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-info">
        <h3 className="contact-info-header">contact us</h3>
        <p className="contact-info-number">(+123) 456 789 10</p>
        <h5 className="contact-info-email">us@example.com</h5>
      </div>
      <div className="contact-form">
        <h3 className="contact-form-header">contact form</h3>
        <form>
          <label>name</label>
          <input type="text" />
          <label>email</label>
          <input type="email" />
          <label>message</label>
          <textarea></textarea>
          <button type="submit">submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
