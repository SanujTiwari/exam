import { useState } from 'react';
import { Icon } from './Icons';

export function ExamScreen({
  section,
  session,
  timerLabel,
  onSelectAnswer,
  onSubmitAnswer,
  onPrevious,
  onNext,
  onJump,
  onToggleFlag,
}) {
  const [feedback, setFeedback] = useState('');
  const lastIndex = section.questions.length - 1;
  const currentIndex = Math.min(Math.max(session.currentIndex || 0, 0), lastIndex);
  const question = section.questions[currentIndex];
  const selected = session.answers?.[question.id];
  const flagged = session.flagged?.includes(question.id);

  const withFeedbackReset = (callback) => () => {
    setFeedback('');
    callback();
  };

  const handleSubmit = () => {
    if (selected === undefined || selected === null) {
      setFeedback('Select an answer before submitting.');
      return;
    }
    setFeedback('');
    onSubmitAnswer();
  };

  return (
    <main className="exam-page">
      <div className="exam-shell">
        <section className="exam-workspace" aria-label={`${section.name} question workspace`}>
          <div className="question-pane">
            <div className="question-content">
              <p className="question-instruction">Choose the correct option.</p>
              <h1 className="question-prompt">{question.prompt}</h1>
            </div>


          </div>

          <div className="options-pane">
            <div className="options-scroll">
              <div className="options-header">
                <h2>Options</h2>
              </div>

              <div className="options-list" role="radiogroup" aria-label="Answer options">
                {question.options.map((option, index) => {
                  const id = `option-${question.id}-${index}`;
                  const isSelected = selected === index;
                  return (
                    <label
                      className={`option-card ${isSelected ? 'is-selected' : ''}`}
                      key={option}
                      htmlFor={id}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={`question-${question.id}`}
                        checked={isSelected}
                        onChange={() => {
                          setFeedback('');
                          onSelectAnswer(index);
                        }}
                      />
                      <span className="option-indicator" aria-hidden="true" />
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </label>
                  );
                })}
              </div>

              {feedback ? (
                <p className="answer-feedback" role="alert">
                  {feedback}
                </p>
              ) : null}
            </div>

            <div className="options-footer">
              <button type="button" className="btn btn--submit" onClick={handleSubmit}>
                Submit Answer
              </button>
            </div>
          </div>

          <nav className="question-rail" aria-label="Question navigation">
            <div className="question-rail__scroll">
              {section.questions.map((item, index) => {
                const isCurrent = index === currentIndex;
                const isSubmitted = session.submittedQuestions?.includes(item.id) ?? false;
                const isVisited = session.visitedQuestions?.includes(item.id) ?? false;
                const isFlagged = session.flagged?.includes(item.id);
                return (
                  <div className="question-step" key={item.id}>
                    <button
                      type="button"
                      className={[
                        'question-number',
                        isCurrent ? 'is-current' : '',
                        isSubmitted ? 'is-submitted' : '',
                        !isCurrent && !isSubmitted && isVisited ? 'is-visited' : '',
                        !isCurrent && !isSubmitted && !isVisited ? 'is-unvisited' : '',
                        isFlagged ? 'is-flagged' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={`Question ${index + 1}${isCurrent ? ', current' : ''}${
                        isSubmitted ? ', submitted' : isCurrent ? ', current' : isVisited ? ', visited' : ', not visited'
                      }${isFlagged ? ', flagged' : ''}`}
                      title={`Question ${index + 1}${isFlagged ? ' (flagged)' : ''}`}
                      onClick={withFeedbackReset(() => onJump(index))}
                    >
                      {index + 1}
                      {isFlagged ? <span className="question-flag-dot" aria-hidden="true" /> : null}
                    </button>
                    {index < section.questions.length - 1 ? (
                      <span className="question-connector" aria-hidden="true" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </nav>
        </section>
      </div>
    </main>
  );
}

