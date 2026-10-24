import { assessmentConfig, branding } from '../config/assessment';
import { Icon } from './Icons';

const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  available: 'Available',
  upcoming: 'Upcoming',
};

function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === 'completed' ? <Icon name="check" size={13} /> : null}
      {status === 'upcoming' ? <Icon name="lock" size={12} /> : null}
      {statusLabel[status]}
    </span>
  );
}

export function AssessmentInfoScreen({
  candidate,
  participantId,
  sectionItems,
  onStartSection,
  onResume,
  onViewResults,
  onOpenPrivacy,
}) {
  const allCompleted = sectionItems.every(({ status }) => status === 'completed');
  const active = sectionItems.find(({ status }) => status === 'in-progress');
  const available = sectionItems.find(({ status }) => status === 'available');

  const mainAction = () => {
    if (allCompleted) {
      onViewResults();
    } else if (active) {
      onResume(active.section.id);
    } else if (available) {
      onStartSection(available.section.id);
    }
  };

  return (
    <main className="info-page">
      <div className="info-panel">
        <div className="info-topline">
          <div>
            <p className="page-eyebrow">Assessment information</p>
            <h1>{assessmentConfig.title}</h1>
            <p className="info-lede">
              Review the assessment structure and instructions before you begin. Each section is
              timed and must be completed in one sitting.
            </p>
          </div>
          <dl className="candidate-card">
            <div>
              <dt>Candidate</dt>
              <dd>{candidate?.name || 'Not registered'}</dd>
            </div>
            <div>
              <dt>Mock participant ID</dt>
              <dd className="mono">{participantId || 'Pending'}</dd>
            </div>
          </dl>
        </div>

        <div className="info-notice">
          <Icon name="info" size={18} />
          <div>
            <strong>Before you begin</strong>
            <p>
              Keep this window open while the timer is running. Your answers and section deadline
              are saved in this browser. Sections unlock in sequence, and a section is submitted
              automatically when its time expires.
            </p>
          </div>
        </div>

        <section className="info-block">
          <div className="info-block__head">
            <h2>Assessment sections</h2>
            <span>
              {sectionItems.filter(({ status }) => status === 'completed').length} of{' '}
              {sectionItems.length} completed
            </span>
          </div>

          <div className="section-table-wrap">
            <table className="section-table">
              <thead>
                <tr>
                  <th scope="col" className="col-number">#</th>
                  <th scope="col">Section</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Time limit</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {sectionItems.map(({ section, status, remainingLabel }, index) => (
                  <tr key={section.id} className={`section-row section-row--${status}`}>
                    <td className="col-number" data-label="#">
                      {index + 1}
                    </td>
                    <td data-label="Section">
                      <div className="section-name-cell">
                        <span className="section-name">{section.name}</span>
                        <span className="section-description">{section.instructions}</span>
                      </div>
                    </td>
                    <td data-label="Questions">{section.questions.length}</td>
                    <td data-label="Time limit">
                      {section.durationMinutes} min
                      {status === 'in-progress' && remainingLabel ? (
                        <span className="remaining-inline">{remainingLabel} left</span>
                      ) : null}
                    </td>
                    <td data-label="Status">
                      <StatusBadge status={status} />
                    </td>
                    <td className="col-action" data-label="Action">
                      {status === 'in-progress' ? (
                        <button
                          type="button"
                          className="btn btn--small btn--primary"
                          onClick={() => onResume(section.id)}
                        >
                          Resume
                        </button>
                      ) : null}
                      {status === 'available' ? (
                        <button
                          type="button"
                          className="btn btn--small btn--primary"
                          onClick={() => onStartSection(section.id)}
                        >
                          Start
                        </button>
                      ) : null}
                      {status === 'completed' ? (
                        <span className="table-muted">Submitted</span>
                      ) : null}
                      {status === 'upcoming' ? (
                        <span className="table-muted">Locked</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="info-columns">
          <section className="info-block">
            <div className="info-block__head">
              <h2>Instructions</h2>
            </div>
            <ol className="instruction-list">
              <li>Select one answer for each multiple-choice question.</li>
              <li>Use Previous and Next to move between questions within a section.</li>
              <li>Answered, unanswered, flagged, and current questions are marked in the question rail.</li>
              <li>Submit Answer records your response and advances to the next question.</li>
              <li>Complete the active section before the countdown reaches zero.</li>
            </ol>
          </section>

          <section className="info-block">
            <div className="info-block__head">
              <h2>Assessment details</h2>
            </div>
            <dl className="detail-list">
              <div>
                <dt>Assessment language</dt>
                <dd>{assessmentConfig.languages.assessment}</dd>
              </div>
              <div>
                <dt>Navigation language</dt>
                <dd>{assessmentConfig.languages.navigation}</dd>
              </div>
              <div>
                <dt>Total questions</dt>
                <dd>
                  {assessmentConfig.sections.reduce(
                    (total, section) => total + section.questions.length,
                    0,
                  )}
                </dd>
              </div>
              <div>
                <dt>Data protection</dt>
                <dd>
                  <button type="button" className="inline-link" onClick={onOpenPrivacy}>
                    View notice
                  </button>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="info-actions">
          <p>
            This is an independent practice simulator operated by {branding.name}. It is not
            affiliated with SHL, AMCAT, any employer, or any official assessment provider.
          </p>
          <button type="button" className="btn btn--primary btn--wide" onClick={mainAction}>
            {allCompleted
              ? 'View results'
              : active
                ? 'Resume assessment'
                : available
                  ? 'Begin assessment'
                  : 'Awaiting section availability'}
          </button>
        </div>
      </div>
    </main>
  );
}
