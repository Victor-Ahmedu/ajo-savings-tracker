import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>What is Ajo Savings Tracker?</h1>
        <p>
          A simple, transparent way for groups to track contributory savings —
          no notebooks, no confusion, no chasing people for updates.
        </p>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>The Problem</h2>
          <p>
            Ajo (also known as Esusu or Adashi) is a trusted, community-based
            savings system practiced widely across Nigeria. Groups of people
            agree to contribute a fixed amount regularly, building savings
            together. But most groups still track this manually — in notebooks,
            WhatsApp messages, or scattered spreadsheets — making it easy to
            lose track of who has paid, how much is saved, and what each member
            has contributed over time.
          </p>
        </div>

        <div className="about-block">
          <h2>What This App Does</h2>
          <p>
            Ajo Savings Tracker gives every group a single, shared source of
            truth. Group organizers can create a group, add members, and record
            contributions as they happen. Every member's running total is
            tracked automatically, so there's no manual addition, no lost
            records, and no disputes over who paid what.
          </p>
        </div>

        <div className="about-block">
          <h2>How It Works</h2>
          <ul>
            <li>
              Create a group and set your contribution amount and frequency
            </li>
            <li>Add the members who are part of your Ajo group</li>
            <li>Record each contribution as members pay in</li>
            <li>View running totals for every member, anytime</li>
          </ul>
        </div>

        <div className="about-block">
          <h2>Built With Trust in Mind</h2>
          <p>
            Ajo has always run on trust between members. This app doesn't
            replace that trust — it supports it, by making sure everyone can see
            the same accurate record, reducing the misunderstandings that come
            with manual tracking.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
