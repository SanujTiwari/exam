import { branding } from '../config/assessment';
import { Icon } from './Icons';

export function ResultsScreen({ candidate, participantId, sectionResults, total, onRestart, onInfo }) {
  const percentage = total.questions ? Math.round((total.correct / total.questions) * 100) : 0;

  return (
    <main className="results-page">
      <div className="results-panel">
        <div className="results-banner">
          <span className="results-banner__icon" aria-hidden="true">
            <Icon name="check" size={28} />
          </span>
          <div>
            <p className="page-eyebrow">Assessment submitted</p>
            <h1>Your practice results</h1>
            <p>
              All available sections have been submitted. Review the section summary below. This
              practice score is not an official assessment result.
            </p>
          </div>
        </div>

        <div className="results-candidate">
          <div>
            <span>Candidate</span>
            <strong>{candidate?.name}</strong>
          </div>
          <div>
            <span>Mock participant ID</span>
            <strong className="mono">{participantId}</strong>
          </div>
          <div>
            <span>Assessment</span>
            <strong>{branding.productName}</strong>
          </div>
        </div>

        <div className="score-strip">
          <div className="score-strip__primary">
            <span className="score-number">{percentage}%</span>
            <span className="score-caption">Overall accuracy</span>
          </div>
          <dl className="score-stats">
            <div>
              <dt>Correct</dt>
              <dd className="score-correct">{total.correct}</dd>
            </div>
            <div>
              <dt>Incorrect</dt>
              <dd className="score-incorrect">{total.incorrect}</dd>
            </div>
            <div>
              <dt>Unanswered</dt>
              <dd>{total.unanswered}</dd>
            </div>
            <div>
              <dt>Total questions</dt>
              <dd>{total.questions}</dd>
            </div>
          </dl>
        </div>

        <section className="results-sections">
          <div className="results-sections__head">
            <h2>Section breakdown</h2>
            <span>Correct and incorrect answer counts</span>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Correct</th>
                <th scope="col">Incorrect</th>
                <th scope="col">Unanswered</th>
                <th scope="col">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {sectionResults.map((result) => (
                <tr key={result.section.id}>
                  <td>{result.section.name}</td>
                  <td className="score-correct">{result.correct}</td>
                  <td className="score-incorrect">{result.incorrect}</td>
                  <td>{result.unanswered}</td>
                  <td>{Math.round((result.correct / result.total) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="results-note">
          <Icon name="info" size={17} />
          <p>
            This simulator is independently operated by {branding.name} and is not affiliated with
            SHL, AMCAT, or any employer. Practice results are stored only in this browser.
          </p>
        </div>

        <div className="results-actions">
          <button type="button" className="btn btn--secondary" onClick={onInfo}>
            Assessment information
          </button>
          <button type="button" className="btn btn--primary" onClick={onRestart}>
            Start a new attempt
          </button>
        </div>
      </div>
    </main>
  );
}
