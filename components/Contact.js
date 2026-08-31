import styles from './Contact.module.css';

export default function Contact({ contact = {} }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.contactBox}>
        {/* الجزء الأيسر: الفورم */}
        <div className={styles.mainFormCard}>
          <p className={styles.eyebrow}>LET'S CONNECT</p>
          <h2 className={styles.title}>I want to build a memorable digital experience with you.</h2>
          <p className={styles.subtitle}>
            Feel free to reach out to me for project opportunities, collaborations, or just to say hi!
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Your Message</label>
              <textarea rows={4} required></textarea>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
              <button type="button" className={styles.cancelBtn}>CANCEL</button>
            </div>
          </form>
        </div>

        {/* الجزء الأيمن: روابط التواصل */}
        <div className={styles.sidebarCard}>
          <div className={styles.sidebarHeader}>CONTACT OPTIONS</div>
          <div className={styles.contactList}>
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className={styles.contactItem}>
                <span className={styles.icon}>✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>{contact.email}</p>
                </div>
              </a>
            ) : null}

            {contact.github ? (
              <a href={contact.github} target="_blank" rel="noreferrer" className={styles.contactItem}>
                <span className={styles.icon}>🐙</span>
                <div>
                  <h4>GitHub</h4>
                  <p>GitHub Profile</p>
                </div>
              </a>
            ) : null}

            {contact.linkedin ? (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={styles.contactItem}>
                <span className={styles.icon}>💼</span>
                <div>
                  <h4>LinkedIn</h4>
                  <p>LinkedIn Profile</p>
                </div>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}