"use client";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Toast from "./Toast";
import { toast } from "react-toastify";

const Contact = ({ contact }: any) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      toast.info("Sending message...");
      setPending(true);
      emailjs
        .sendForm(
          "service_t34zkxg",
          "template_yihe4x4",
          form.current,
          "61kbKn-ajAMnacTNt"
        )
        .then(() => {
          toast.success("Message sent successfully!");
          form.current!.reset();
          setPending(false);
        })
        .catch((error) => {
          toast.error(error.text || "An error occurred!");
          setPending(false);
        });
    }
  };

  return (
    <section className="contact">
      <Toast />
      <div className="contact-info">
        <h3 className="contact-info-header">{contact.heading}</h3>
        <p className="contact-info-number">(+123) 456 789 10</p>
        <h5 className="contact-info-email">us@example.com</h5>
      </div>
      <div className="contact-form">
        <h3 className="contact-form-header">{contact.formHeading}</h3>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="user_name">name:</label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            placeholder="Full Name"
            required
            maxLength={50}
          />
          <label htmlFor="user_email">email:</label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            maxLength={50}
          />
          <label htmlFor="user_message">message:</label>
          <textarea
            id="user_message"
            name="user_message"
            rows={7}
            placeholder="Leave a Message"
            required
            maxLength={500}
          ></textarea>
          <button className="main-btn" type="submit" disabled={pending}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
export default Contact;
