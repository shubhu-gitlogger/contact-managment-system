
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-container">

        <div className="contact-header">
          <h1>Get in Touch</h1>

          <p>
            Have a question, need help, or want to know more?
            Send us a message and our team will get back to you.
          </p>
        </div>

        <ContactForm />

      </div>

    </div>
  );
}

export default Contact;

