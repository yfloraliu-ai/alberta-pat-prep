import Link from "next/link";
import { SUBJECTS } from "@/lib/pat-data";

export default function HomePage() {
  return (
    <>
      <h1>
        A calm, organized way to get ready for the{" "}
        <span className="highlight">June PATs</span>.
      </h1>
      <p className="subtitle">
        Work through each subject the way you&apos;d fill a good notebook: one
        topic at a time, with AI-generated practice questions and honest,
        rubric-based feedback on your writing.
      </p>

      <p className="section-label">Subjects</p>
      <div className="card">
        {SUBJECTS.map((subject, i) => (
          <Link className="index-row" href={`/practice?subject=${subject.id}`} key={subject.id}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="index-name">{subject.name}</span>
            <span className="leader" />
            <span className="go">Start practicing →</span>
          </Link>
        ))}
      </div>

      <div className="card gold-edge">
        <h2>Writing Coach — marked like the real Part A</h2>
        <p style={{ margin: 0, color: "var(--body-muted)" }}>
          Hand in a story or a letter and get scores for Content, Organization,
          Sentence Structure, Vocabulary and Conventions, with next steps
          written for you.
        </p>
        <p style={{ margin: "0.8rem 0 0" }}>
          <Link href="/writing" className="go">
            Start writing →
          </Link>
        </p>
      </div>

      <div className="card">
        <h2>About the Grade 6 PATs</h2>
        <p style={{ margin: 0 }}>
          Every May–June, Alberta Grade 6 students write Provincial Achievement
          Tests in English Language Arts, Mathematics, Science and Social
          Studies. The ELA test has a writing part (Part A) and a reading part
          (Part B); the math test has a no-calculator part and a calculator
          part. This app helps you practice both the multiple-choice question
          styles and the written responses.{" "}
          <span className="hand-note">You&apos;ve got this!</span>
        </p>
      </div>

      <p className="footer-note">
        Independent study tool — not affiliated with Alberta Education.
      </p>
    </>
  );
}
