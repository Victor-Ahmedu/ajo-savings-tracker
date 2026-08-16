function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} Ajo Savings Tracker. Built by <strong>Victor Ahmedu</strong>{" "}
        for the 3MTT Capstone Project.
      </p>
    </footer>
  );
}

export default Footer;
