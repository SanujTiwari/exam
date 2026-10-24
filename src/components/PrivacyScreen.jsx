import { useState } from 'react';
import { assessmentConfig, branding } from '../config/assessment';
import { Icon } from './Icons';

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are and Scope of Notice',
    content: (
      <>
        <p>
          This notice is provided by AptitudeLab, an independent practice assessment simulator. It
          applies to the information you choose to enter on this practice site and to the answers
          you record while completing a mock assessment.
        </p>
        <p>
          AptitudeLab is not SHL, AMCAT, or an employer assessment platform, and this notice does not
          describe the privacy practices of those organizations. If you are taking a real assessment
          through another provider, review that provider&apos;s notice before you begin.
        </p>
      </>
    ),
  },
  {
    id: 'employer-controller',
    title: 'Employer as the Data Controller',
    content: (
      <>
        <p>
          In a live recruitment process, an employer normally decides which assessment is used, what
          candidate information is collected, why it is collected, and who receives the results.
          The employer generally acts as the data controller in that situation.
        </p>
        <p>
          No employer, university, or recruiter receives your data from this practice simulator. The
          details you enter here are used only to run your mock assessment.
        </p>
      </>
    ),
  },
  {
    id: 'provider-controller',
    title: 'Assessment Provider as the Data Controller',
    content: (
      <>
        <p>
          AptitudeLab acts as the provider of this independent practice experience. We use your name,
          registration number, email address, contact number, security question response, and
          assessment answers only to operate the mock assessment and display your results.
        </p>
        <p>
          The simulator stores its session state in your browser&apos;s local storage so that your
          timer, answers, and section progress survive a page refresh. No server-side account is
          created by this demonstration.
        </p>
      </>
    ),
  },
  {
    id: 'sharing-rights',
    title: 'Data Sharing and Your Rights',
    content: (
      <>
        <p>
          This practice simulator does not sell your information and does not share it with external
          employers or assessment providers. Data remains in the browser profile you use to complete
          the exercise.
        </p>
        <p>
          You may clear your practice data at any time by clearing this site&apos;s browser storage or
          by starting a new attempt from the results screen. If a future version of this simulator is
          connected to a server, this notice and the available controls will be updated before that
          processing begins.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Data Protection Contact Details',
    content: (
      <>
        <p>
          Questions about privacy in this independent practice simulator can be sent to the practice
          support contact shown below. This contact is not an official data protection officer for
          SHL, AMCAT, or any employer.
        </p>
        <p className="contact-line">Email: {branding.supportEmail}</p>
        <p className="contact-line">Practice platform: {branding.name}</p>
      </>
    ),
  },
];

export function PrivacyScreen({
  initialAccepted = false,
  reviewMode = false,
  onContinue,
}) {
  const [openSections, setOpenSections] = useState([]);
  const [accepted, setAccepted] = useState(Boolean(initialAccepted));
  const [error, setError] = useState('');

  const toggle = (id) => {
    setOpenSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleContinue = () => {
    if (!reviewMode && !accepted) {
      setError('Confirm that you have read and understood this notice to continue.');
      return;
    }
    setError('');
    onContinue();
  };

  return (
    <main className="auth-page">
      <div className="auth-panel privacy-panel">
        <div className="privacy-heading">
          <div className="privacy-heading__icon" aria-hidden="true">
            <Icon name="shield" size={24} />
          </div>
          <div>
            <h1>Candidate Online Assessment Data Protection Notice</h1>
            <p className="privacy-updated">
              This Notice was last updated on {assessmentConfig.privacy.lastUpdated}.
            </p>
          </div>
        </div>

        <div className="notice-summary">
          <p>
            <strong>CHANGES TO THIS NOTICE:</strong> This practice notice has been written for an
            independent assessment simulator. It explains what the simulator stores, why it stores
            it, and the choices available to you. AptitudeLab is not affiliated with SHL or AMCAT.
          </p>
        </div>

        <div className="accordion">
          {sections.map((section) => {
            const open = openSections.includes(section.id);
            return (
              <section className={`accordion-item ${open ? 'is-open' : ''}`} key={section.id}>
                <h2>
                  <button
                    type="button"
                    className="accordion-trigger"
                    aria-expanded={open}
                    aria-controls={`notice-${section.id}`}
                    onClick={() => toggle(section.id)}
                  >
                    <Icon name="chevronRight" size={17} />
                    <span>{section.title}</span>
                  </button>
                </h2>
                {open ? (
                  <div className="accordion-content" id={`notice-${section.id}`}>
                    {section.content}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        <div className="privacy-footer">
          <div className="privacy-confirm">
            <label className="checkbox-label" htmlFor="privacy-confirm">
              <input
                id="privacy-confirm"
                type="checkbox"
                checked={accepted}
                onChange={(event) => {
                  setAccepted(event.target.checked);
                  if (event.target.checked) setError('');
                }}
              />
              <span>I confirm I have read and understood this Notice.</span>
            </label>
            {error ? (
              <p className="field-error" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="form-actions privacy-actions">
            <button type="button" className="btn btn--primary" onClick={handleContinue}>
              {reviewMode ? 'Close notice' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
