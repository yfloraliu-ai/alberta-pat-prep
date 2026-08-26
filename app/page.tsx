import Link from "next/link";
import { SUBJECTS } from "@/lib/pat-data";

export default function HomePage() {
  return (
    <>
      <h1>Get ready for the Grade 6 PATs</h1>
      <p className="subtitle">
        Practice for Alberta&apos;s Grade 6 Provincial Achievement Tests with
        AI-generated questions and instant writing feedback, aligned with the
        Alberta Programs of Study.
      </p>

      <div className="card-grid">
        {SUBJECTS.map((subject) => (
          <div className="card" key={subject.id}>
            <h2>{subject.name}</h2>
            <p className="pat-part">{subject.patPart}</p>
            <Link href={`/practice?subject=${subject.id}`}>
              Start practicing →
            </Link>
          </div>
        ))}
        <div className="card">
          <h2>✍️ Writing Coach</h2>
          <p className="pat-part">
            ELA Part A: narrative and functional writing, marked against the
            official rubric categories
          </p>
          <Link href="/writing">Get feedback on your writing →</Link>
        </div>
      </div>

      <div className="card">
        <h2>About the Grade 6 PATs</h2>
        <p>
          Every May–June, Alberta Grade 6 students write Provincial Achievement
          Tests in English Language Arts, Mathematics, Science and Social
          Studies. The ELA test has a writing part (Part A) and a reading part
          (Part B); the math test has a no-calculator part and a calculator
          part. This app helps you practice both the multiple-choice question
          styles and the written responses.
        </p>
      </div>

      <p className="footer-note">
        Independent study tool — not affiliated with Alberta Education.
      </p>
    </>
  );
}
