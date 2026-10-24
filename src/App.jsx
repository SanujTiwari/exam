import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { MenuDrawer } from './components/MenuDrawer';
import { Modal } from './components/Modal';
import { RegistrationScreen } from './components/RegistrationScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { AssessmentInfoScreen } from './components/AssessmentInfoScreen';
import { ExamScreen } from './components/ExamScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { Icon } from './components/Icons';
import { assessmentConfig, branding, getSection } from './config/assessment';

const STORAGE_KEY = 'aptitudelab.practice-assessment.v1';
const STATE_VERSION = 1;

const initialState = {
  version: STATE_VERSION,
  stage: 'registration',
  candidate: null,
  participantId: null,
  privacyAccepted: false,
  currentSectionId: null,
  sessions: {},
  notice: null,
};

function createParticipantId() {
  const random = () => Math.floor(Math.random() * 10);
  const digits = Array.from({ length: 9 }, random).join('');
  return `AL-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`;
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) return initialState;
    return {
      ...initialState,
      ...parsed,
      sessions: parsed.sessions || {},
    };
  } catch {
    return initialState;
  }
}

function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewPrivacy, setReviewPrivacy] = useState(false);
  const [modal, setModal] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState('');
  const expiryGuard = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 6000);
  }, []);

  const activeSession = state.currentSectionId
    ? state.sessions[state.currentSectionId]
    : null;
  const activeDeadline =
    activeSession?.status === 'in-progress' ? activeSession.deadline : null;
  const activeSection = state.currentSectionId ? getSection(state.currentSectionId) : null;

  const remainingSeconds = activeDeadline
    ? Math.max(0, Math.ceil((activeDeadline - now) / 1000))
    : 0;
  const timerLabel = formatClock(remainingSeconds);

  const sectionItems = useMemo(
    () =>
      assessmentConfig.sections.map((section, index) => {
        const session = state.sessions[section.id];
        let status = 'upcoming';

        if (session?.status === 'completed') {
          status = 'completed';
        } else if (session?.status === 'in-progress') {
          status = 'in-progress';
        } else if (!assessmentConfig.navigation.sequentialSections) {
          status = 'available';
        } else {
          const previous = assessmentConfig.sections[index - 1];
          const previousCompleted =
            index === 0 || state.sessions[previous.id]?.status === 'completed';
          status = previousCompleted ? 'available' : 'upcoming';
        }

        const secondsLeft =
          status === 'in-progress' && session?.deadline
            ? Math.max(0, Math.ceil((session.deadline - now) / 1000))
            : null;

        return {
          section,
          status,
          remainingLabel: secondsLeft !== null ? formatClock(secondsLeft) : null,
        };
      }),
    [state.sessions, now],
  );

  const completeSection = useCallback(
    (sectionId, { auto = false } = {}) => {
      setState((current) => {
        const session = current.sessions[sectionId];
        if (!session || session.status !== 'in-progress') return current;

        const sessions = {
          ...current.sessions,
          [sectionId]: {
            ...session,
            status: 'completed',
            completedAt: Date.now(),
            autoSubmitted: auto,
          },
        };
        const allCompleted = assessmentConfig.sections.every(
          (section) => sessions[section.id]?.status === 'completed',
        );

        return {
          ...current,
          sessions,
          stage: allCompleted ? 'results' : 'info',
          currentSectionId: null,
          notice: auto
            ? {
                type: 'time-expired',
                sectionId,
                message: `${getSection(sectionId)?.name || 'The section'} was submitted automatically when time expired.`,
                at: Date.now(),
              }
            : current.notice,
        };
      });

      expiryGuard.current = null;
      setModal(null);
      setReviewPrivacy(false);
      if (auto) {
        showToast(
          `${getSection(sectionId)?.name || 'Section'} submitted automatically when time expired.`,
        );
      }
    },
    [showToast],
  );

  useEffect(() => {
    if (!activeDeadline || !state.currentSectionId) return;
    if (Date.now() < activeDeadline) return;
    if (expiryGuard.current === activeDeadline) return;
    expiryGuard.current = activeDeadline;
    completeSection(state.currentSectionId, { auto: true });
  }, [activeDeadline, state.currentSectionId, now, completeSection]);

  useEffect(() => {
    const stageIsExam = state.stage === 'exam';
    if (stageIsExam && (!activeSection || activeSession?.status !== 'in-progress')) {
      setState((current) =>
        current.stage === 'exam'
          ? { ...current, stage: current.candidate ? 'info' : 'registration' }
          : current,
      );
    }
  }, [state.stage, activeSection, activeSession?.status]);

  const updateCurrentSession = useCallback((updater) => {
    setState((current) => {
      if (!current.currentSectionId) return current;
      const session = current.sessions[current.currentSectionId];
      if (!session || session.status !== 'in-progress') return current;
      return {
        ...current,
        sessions: {
          ...current.sessions,
          [current.currentSectionId]: updater(session),
        },
      };
    });
  }, []);

  const handleRegistration = (candidate) => {
    setState((current) => ({
      ...current,
      stage: 'privacy',
      candidate,
      participantId: current.participantId || createParticipantId(),
      privacyAccepted: false,
    }));
    setReviewPrivacy(false);
  };

  const handlePrivacyContinue = () => {
    if (reviewPrivacy) {
      setState((current) => ({ ...current, privacyAccepted: true }));
      setReviewPrivacy(false);
      return;
    }
    setState((current) => ({
      ...current,
      privacyAccepted: true,
      stage: current.candidate ? 'info' : 'registration',
    }));
  };

  const startOrResumeSection = (sectionId) => {
    if (!state.candidate) {
      showToast('Complete registration before starting a section.');
      return;
    }

    const existing = state.sessions[sectionId];
    const item = sectionItems.find((entry) => entry.section.id === sectionId);
    if (!item || item.status === 'upcoming' || item.status === 'completed') return;

    if (existing?.status === 'in-progress') {
      if (existing.deadline <= Date.now()) {
        completeSection(sectionId, { auto: true });
        return;
      }
      setState((current) => ({ ...current, stage: 'exam', currentSectionId: sectionId }));
      setNow(Date.now());
      return;
    }

    const section = getSection(sectionId);
    if (!section) return;
    const startedAt = Date.now();
    const session = {
      status: 'in-progress',
      startedAt,
      deadline: startedAt + section.durationMinutes * 60 * 1000,
      currentIndex: 0,
      answers: {},
      flagged: [],
      submittedQuestions: [],
      visitedQuestions: [section.questions[0]?.id].filter(Boolean),
    };

    setState((current) => ({
      ...current,
      stage: 'exam',
      currentSectionId: sectionId,
      sessions: { ...current.sessions, [sectionId]: session },
    }));
    setNow(startedAt);
    setMenuOpen(false);
  };

  const handleSelectAnswer = (optionIndex) => {
    if (!activeSection || !activeSession) return;
    const question = activeSection.questions[activeSession.currentIndex];
    if (!question) return;
    updateCurrentSession((session) => ({
      ...session,
      answers: { ...session.answers, [question.id]: optionIndex },
    }));
  };

  const handleSubmitAnswer = () => {
    if (!activeSection || !activeSession) return;
    const currentIndex = activeSession.currentIndex;
    const question = activeSection.questions[currentIndex];
    if (!question || activeSession.answers[question.id] === undefined) return;

    const isLast = currentIndex === activeSection.questions.length - 1;
    updateCurrentSession((session) => ({
      ...session,
      submittedQuestions: session.submittedQuestions?.includes(question.id)
        ? session.submittedQuestions
        : [...(session.submittedQuestions || []), question.id],
      visitedQuestions: [...new Set([...(session.visitedQuestions || []), question.id, ...(activeSection.questions[currentIndex + 1] ? [activeSection.questions[currentIndex + 1].id] : [])])],
      currentIndex: isLast ? currentIndex : currentIndex + 1,
    }));

    if (isLast) {
      setModal({ type: 'finish-section' });
    }
  };

  const moveQuestion = (delta) => {
    if (!activeSection || !activeSession) return;
    const nextIndex = Math.min(
      Math.max(activeSession.currentIndex + delta, 0),
      activeSection.questions.length - 1,
    );
    updateCurrentSession((session) => {
      const nextQuestionId = activeSection.questions[nextIndex]?.id;
      return {
        ...session,
        currentIndex: nextIndex,
        visitedQuestions: nextQuestionId
          ? [...new Set([...(session.visitedQuestions || [activeSection.questions[session.currentIndex]?.id].filter(Boolean)), nextQuestionId])]
          : session.visitedQuestions || [],
      };
    });
  };

  const jumpToQuestion = (index) => {
    if (!activeSection) return;
    const safe = Math.min(Math.max(index, 0), activeSection.questions.length - 1);
    updateCurrentSession((session) => {
      const questionId = activeSection.questions[safe]?.id;
      return {
        ...session,
        currentIndex: safe,
        visitedQuestions: questionId
          ? [...new Set([...(session.visitedQuestions || [activeSection.questions[session.currentIndex]?.id].filter(Boolean)), questionId])]
          : session.visitedQuestions || [],
      };
    });
  };

  const toggleFlag = () => {
    if (!activeSection || !activeSession) return;
    const question = activeSection.questions[activeSession.currentIndex];
    if (!question) return;
    updateCurrentSession((session) => {
      const flagged = session.flagged || [];
      return {
        ...session,
        flagged: flagged.includes(question.id)
          ? flagged.filter((id) => id !== question.id)
          : [...flagged, question.id],
      };
    });
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      showToast('Full screen is not available in this browser.');
    }
  };

  const openPrivacyReview = () => {
    setMenuOpen(false);
    setReviewPrivacy(true);
  };

  const openAssessmentInfo = () => {
    setMenuOpen(false);
    if (!state.candidate) {
      showToast('Complete registration to view assessment information.');
      return;
    }
    setReviewPrivacy(false);
    setState((current) => ({ ...current, stage: 'info' }));
  };

  const requestFinishSection = () => {
    setMenuOpen(false);
    if (!activeSession || activeSession.status !== 'in-progress') return;
    setModal({ type: 'finish-section' });
  };

  const requestExit = () => setModal({ type: 'exit' });

  const confirmExit = () => {
    setModal(null);
    setState((current) => ({ ...current, stage: 'info' }));
    showToast('Assessment paused. Your section timer is still running.');
  };

  const handleRestart = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState({ ...initialState, sessions: {} });
    setMenuOpen(false);
    setReviewPrivacy(false);
    setModal(null);
    setToast('');
    setNow(Date.now());
  };

  const sectionResults = assessmentConfig.sections.map((section) => {
    const session = state.sessions[section.id];
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    section.questions.forEach((question) => {
      const answer = session?.answers?.[question.id];
      if (answer === undefined) unanswered += 1;
      else if (answer === question.correctIndex) correct += 1;
      else incorrect += 1;
    });

    return {
      section,
      total: section.questions.length,
      correct,
      incorrect,
      unanswered,
    };
  });

  const totals = sectionResults.reduce(
    (accumulator, result) => ({
      correct: accumulator.correct + result.correct,
      incorrect: accumulator.incorrect + result.incorrect,
      unanswered: accumulator.unanswered + result.unanswered,
      questions: accumulator.questions + result.total,
    }),
    { correct: 0, incorrect: 0, unanswered: 0, questions: 0 },
  );


  const finishModalSection = activeSection;
  const finishModalSession = activeSession;
  const finishAnswered = finishModalSection
    ? finishModalSection.questions.filter(
        (question) => finishModalSession?.answers?.[question.id] !== undefined,
      ).length
    : 0;

  let content;
  if (reviewPrivacy) {
    content = (
      <PrivacyScreen
        initialAccepted={state.privacyAccepted}
        reviewMode
        onContinue={handlePrivacyContinue}
      />
    );
  } else if (state.stage === 'registration') {
    content = (
      <RegistrationScreen
        initialCandidate={state.candidate}
        onContinue={handleRegistration}
      />
    );
  } else if (state.stage === 'privacy') {
    content = (
      <PrivacyScreen
        initialAccepted={state.privacyAccepted}
        onContinue={handlePrivacyContinue}
      />
    );
  } else if (state.stage === 'exam' && activeSection && activeSession) {
    content = (
      <ExamScreen
        section={activeSection}
        session={activeSession}
        timerLabel={timerLabel}
        onSelectAnswer={handleSelectAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onPrevious={() => moveQuestion(-1)}
        onNext={() => moveQuestion(1)}
        onJump={jumpToQuestion}
        onToggleFlag={toggleFlag}
      />
    );
  } else if (state.stage === 'results') {
    content = (
      <ResultsScreen
        candidate={state.candidate}
        participantId={state.participantId}
        sectionResults={sectionResults}
        total={totals}
        onRestart={() => setModal({ type: 'restart' })}
        onInfo={() => setState((current) => ({ ...current, stage: 'info' }))}
      />
    );
  } else {
    content = (
      <AssessmentInfoScreen
        candidate={state.candidate}
        participantId={state.participantId}
        sectionItems={sectionItems}
        onStartSection={startOrResumeSection}
        onResume={startOrResumeSection}
        onViewResults={() => setState((current) => ({ ...current, stage: 'results' }))}
        onOpenPrivacy={openPrivacyReview}
        onFullscreen={toggleFullscreen}
      />
    );
  }

  return (
    <div className="app" style={{ '--brand': branding.accent }}>
      <SiteHeader
        onMenu={() => setMenuOpen(true)}
        onFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        timerLabel={timerLabel}
        showTimer={state.stage === 'exam' && Boolean(activeSession)}
        onHelp={() => setModal({ type: 'help' })}
        onExit={requestExit}
      />

      {content}

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        candidate={state.candidate}
        participantId={state.participantId}
        languages={assessmentConfig.languages}
        onOpenPrivacy={openPrivacyReview}
        onFullscreen={toggleFullscreen}
      />

      <Modal
        open={modal?.type === 'help'}
        title="Assessment help"
        onClose={() => setModal(null)}
        actions={
          <button type="button" className="btn btn--primary" onClick={() => setModal(null)}>
            Close
          </button>
        }
      >
        <div className="help-content">
          <p>
            Use the question numbers on the right to move between questions. Selecting an option
            saves it immediately in this browser.
          </p>
          <ul>
            <li>Previous and Next move within the current section.</li>
            <li>Submit Answer records your response and advances.</li>
            <li>Flag question marks an item for later review.</li>
            <li>The timer does not pause while you view help or the assessment menu.</li>
            <li>
              If time expires, the current section is submitted automatically and your answers are
              retained.
            </li>
          </ul>
          <p className="modal-muted">
            This is an independent practice simulator and not a live proctored assessment.
          </p>
        </div>
      </Modal>

      <Modal
        open={modal?.type === 'exit'}
        title="Exit the assessment?"
        onClose={() => setModal(null)}
        actions={
          <>
            <button type="button" className="btn btn--secondary" onClick={() => setModal(null)}>
              Stay
            </button>
            <button type="button" className="btn btn--primary" onClick={confirmExit}>
              Exit section
            </button>
          </>
        }
      >
        <p>
          You can return to the assessment information page, but the section timer will continue
          running. Your saved answers will remain available.
        </p>
      </Modal>

      <Modal
        open={modal?.type === 'finish-section'}
        title="Finish this section?"
        onClose={() => setModal(null)}
        actions={
          <>
            <button type="button" className="btn btn--secondary" onClick={() => setModal(null)}>
              Keep working
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                if (state.currentSectionId) completeSection(state.currentSectionId);
              }}
            >
              Submit section
            </button>
          </>
        }
      >
        {finishModalSection ? (
          <div>
            <p>
              You are about to submit <strong>{finishModalSection.name}</strong>. You will not be
              able to return to this section after submission.
            </p>
            <dl className="modal-summary">
              <div>
                <dt>Answered</dt>
                <dd>
                  {finishAnswered} of {finishModalSection.questions.length}
                </dd>
              </div>
              <div>
                <dt>Unanswered</dt>
                <dd>{finishModalSection.questions.length - finishAnswered}</dd>
              </div>
            </dl>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={modal?.type === 'restart'}
        title="Start a new attempt?"
        onClose={() => setModal(null)}
        actions={
          <>
            <button type="button" className="btn btn--secondary" onClick={() => setModal(null)}>
              Keep results
            </button>
            <button type="button" className="btn btn--primary" onClick={handleRestart}>
              Start over
            </button>
          </>
        }
      >
        <p>
          This will permanently clear the current candidate profile, answers, timer, and section
          results from this browser.
        </p>
      </Modal>

      {toast ? (
        <div className="app-toast" role="status">
          <Icon name="info" size={17} />
          <span>{toast}</span>
          <button
            type="button"
            className="icon-button icon-button--small"
            onClick={() => setToast('')}
            aria-label="Dismiss message"
          >
            <Icon name="close" size={15} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
