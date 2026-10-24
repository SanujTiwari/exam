import { useState } from 'react';
import { assessmentConfig } from '../config/assessment';
import { Icon } from './Icons';

const emptyForm = {
  lpuRegistration: '',
  name: '',
  email: '',
  contact: '',
  securityQuestion: '',
  securityAnswer: '',
  terms: false,
};

function validate(form) {
  const errors = {};
  if (!form.lpuRegistration.trim()) {
    errors.lpuRegistration = 'Enter your LPU registration number.';
  } else if (form.lpuRegistration.trim().length < 4) {
    errors.lpuRegistration = 'Registration number must be at least 4 characters.';
  }

  if (!form.name.trim()) {
    errors.name = 'Enter your name.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }

  if (!form.email.trim()) {
    errors.email = 'Enter your email ID.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.contact.trim()) {
    errors.contact = 'Enter your contact number.';
  } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.contact.trim())) {
    errors.contact = 'Enter a valid contact number (10 to 15 digits).';
  }

  if (!form.securityQuestion) {
    errors.securityQuestion = 'Select a security question.';
  }

  if (!form.securityAnswer.trim()) {
    errors.securityAnswer = 'Enter your answer.';
  }

  if (!form.terms) {
    errors.terms = 'You must agree to the Terms and Conditions.';
  }

  return errors;
}

export function RegistrationScreen({ initialCandidate, onContinue, onMenu, onFullscreen }) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    lpuRegistration: initialCandidate?.lpuRegistration || '',
    name: initialCandidate?.name || '',
    email: initialCandidate?.email || '',
    contact: initialCandidate?.contact || '',
    securityQuestion: initialCandidate?.securityQuestion || '',
    securityAnswer: initialCandidate?.securityAnswer || '',
    terms: Boolean(initialCandidate),
  }));
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState({ personal: true, security: true });
  const [status, setStatus] = useState('');

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = document.getElementById(`field-${Object.keys(nextErrors)[0]}`);
      first?.focus();
      return;
    }

    onContinue({
      lpuRegistration: form.lpuRegistration.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      contact: form.contact.trim(),
      securityQuestion: form.securityQuestion,
      securityAnswer: form.securityAnswer.trim(),
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus('The form has been cleared. You can begin again.');
  };

  const toggleSection = (section) => {
    setExpanded((current) => ({ ...current, [section]: !current[section] }));
  };

  return (
    <main className="auth-page">
      <div className="auth-panel registration-panel">
        <div className="form-notice">* indicates mandatory fields.</div>

        <form className="registration-form" onSubmit={handleSubmit} noValidate>
          <section className="form-section">
            <div className="form-section__heading-row">
              <h1 className="form-section__title">Personal Information</h1>
              <button
                type="button"
                className="section-toggle"
                aria-expanded={expanded.personal}
                aria-label={expanded.personal ? 'Collapse personal information' : 'Expand personal information'}
                onClick={() => toggleSection('personal')}
              >
                <Icon name={expanded.personal ? 'chevronDown' : 'chevronRight'} size={17} />
              </button>
            </div>

            {expanded.personal ? (
              <div className="form-grid">
                <label className="form-label" htmlFor="field-lpuRegistration">
                  LPU Registration Number*
                </label>
                <div className="form-control">
                  <input
                    id="field-lpuRegistration"
                    className={`text-input ${errors.lpuRegistration ? 'has-error' : ''}`}
                    type="text"
                    value={form.lpuRegistration}
                    autoComplete="off"
                    aria-invalid={Boolean(errors.lpuRegistration)}
                    aria-describedby={errors.lpuRegistration ? 'error-lpuRegistration' : undefined}
                    onChange={(event) => update('lpuRegistration', event.target.value)}
                  />
                  {errors.lpuRegistration ? (
                    <p className="field-error" id="error-lpuRegistration">
                      {errors.lpuRegistration}
                    </p>
                  ) : null}
                </div>

                <label className="form-label" htmlFor="field-name">
                  Name*
                </label>
                <div className="form-control">
                  <input
                    id="field-name"
                    className={`text-input ${errors.name ? 'has-error' : ''}`}
                    type="text"
                    value={form.name}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    onChange={(event) => update('name', event.target.value)}
                  />
                  {errors.name ? (
                    <p className="field-error" id="error-name">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <label className="form-label" htmlFor="field-email">
                  Email ID*
                </label>
                <div className="form-control">
                  <input
                    id="field-email"
                    className={`text-input ${errors.email ? 'has-error' : ''}`}
                    type="email"
                    value={form.email}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    onChange={(event) => update('email', event.target.value)}
                  />
                  {errors.email ? (
                    <p className="field-error" id="error-email">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <label className="form-label" htmlFor="field-contact">
                  Contact Number*
                </label>
                <div className="form-control">
                  <input
                    id="field-contact"
                    className={`text-input ${errors.contact ? 'has-error' : ''}`}
                    type="tel"
                    value={form.contact}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? 'error-contact' : undefined}
                    onChange={(event) => update('contact', event.target.value)}
                  />
                  {errors.contact ? (
                    <p className="field-error" id="error-contact">
                      {errors.contact}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>

          <section className="form-section">
            <div className="form-section__heading-row">
              <h2 className="form-section__title">Security Question</h2>
              <button
                type="button"
                className="section-toggle"
                aria-expanded={expanded.security}
                aria-label={expanded.security ? 'Collapse security question' : 'Expand security question'}
                onClick={() => toggleSection('security')}
              >
                <Icon name={expanded.security ? 'chevronDown' : 'chevronRight'} size={17} />
              </button>
            </div>

            {expanded.security ? (
              <div className="form-grid">
                <label className="form-label" htmlFor="field-securityQuestion">
                  Select a security question*
                </label>
                <div className="form-control">
                  <div className="select-wrap">
                    <select
                      id="field-securityQuestion"
                      className={`text-input select-input ${errors.securityQuestion ? 'has-error' : ''}`}
                      value={form.securityQuestion}
                      aria-invalid={Boolean(errors.securityQuestion)}
                      aria-describedby={errors.securityQuestion ? 'error-securityQuestion' : undefined}
                      onChange={(event) => update('securityQuestion', event.target.value)}
                    >
                      <option value="">Select a security question</option>
                      {assessmentConfig.securityQuestions.map((question) => (
                        <option key={question} value={question}>
                          {question}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={15} />
                  </div>
                  {errors.securityQuestion ? (
                    <p className="field-error" id="error-securityQuestion">
                      {errors.securityQuestion}
                    </p>
                  ) : null}
                </div>

                <label className="form-label" htmlFor="field-securityAnswer">
                  Answer*
                </label>
                <div className="form-control">
                  <input
                    id="field-securityAnswer"
                    className={`text-input ${errors.securityAnswer ? 'has-error' : ''}`}
                    type="text"
                    value={form.securityAnswer}
                    autoComplete="off"
                    aria-invalid={Boolean(errors.securityAnswer)}
                    aria-describedby={errors.securityAnswer ? 'error-securityAnswer' : undefined}
                    onChange={(event) => update('securityAnswer', event.target.value)}
                  />
                  {errors.securityAnswer ? (
                    <p className="field-error" id="error-securityAnswer">
                      {errors.securityAnswer}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>

          <div className="registration-footer">
            <div className="registration-footer__terms">
              <div className="terms-row">
                <label className="checkbox-label" htmlFor="field-terms">
                  <input
                    id="field-terms"
                    type="checkbox"
                    checked={form.terms}
                    aria-invalid={Boolean(errors.terms)}
                    aria-describedby={errors.terms ? 'error-terms' : undefined}
                    onChange={(event) => update('terms', event.target.checked)}
                  />
                  <span>
                    I agree to <a href="#terms" onClick={(event) => event.preventDefault()}>Terms and Conditions</a>
                  </span>
                </label>
                {errors.terms ? (
                  <p className="field-error" id="error-terms">
                    {errors.terms}
                  </p>
                ) : null}
              </div>

              {status ? <p className="inline-status" role="status">{status}</p> : null}
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn--secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>

      <p className="auth-disclaimer">
        Independent practice simulator. This assessment is not affiliated with SHL, AMCAT, or any
        employer.
      </p>
    </main>
  );
}
