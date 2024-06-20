import { getSystemPreferences } from "../../../utils/actions";
import { libraries } from "../../../utils/constants";
// use email js for task

const Contact = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const contact: { [key: string]: string } = libraries[language].main.contact;

  return (
    <section className="contact">
      <div className="contact-info">
        <h3 className="contact-info-header">{contact.heading}</h3>
        <p className="contact-info-number">(+123) 456 789 10</p>
        <h5 className="contact-info-email">us@example.com</h5>
      </div>
      <div className="contact-form">
        <h3 className="contact-form-header">{contact.formHeading}</h3>
        <form>
          <label>{contact.name}</label>
          <input type="text" />
          <label>{contact.email}</label>
          <input type="email" />
          <label>{contact.message}</label>
          <textarea></textarea>
          <button type="submit">{contact.submit}</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
