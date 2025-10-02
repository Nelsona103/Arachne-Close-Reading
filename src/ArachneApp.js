import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Copy, CheckCircle, Award, Brain, Zap, Target, ChevronUp } from 'lucide-react';

const ArachneApp = () => {
  const [page, setPage] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [startTime] = useState(Date.now());
  const [chunk1Highlights, setChunk1Highlights] = useState({ traits: [], actions: [], consequences: [] });
  const [chunk2Highlights, setChunk2Highlights] = useState({ traits: [], actions: [], consequences: [] });
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [summaryOrder, setSummaryOrder] = useState([null, null, null, null, null]);
  const [checkResult, setCheckResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reflection, setReflection] = useState('');
  const [copied, setCopied] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const dragItem = useRef(null);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chunk1Text = [
    "Arachne was used to being wondered at, and she was immensely proud of the skill that had brought so many to look on her.",
    "Praise was all she lived for, and it displeased her greatly that people should think anyone, even a goddess, could teach her anything.",
    "Therefore, when she heard them murmur, she would stop her work and turn round indignantly to say, \"With my own ten fingers I gained this skill, and by hard practice from early morning till night.\"",
    "\"I never had time to stand looking as you people do while another maiden worked.\"",
    "\"Nor if I had, would I give Athene credit because the girl was more skillful than I.\"",
    "\"As for Athene's weaving, how could there be finer cloth or more beautiful embroidery than mine?\"",
    "\"If Athene herself were to come down and compete with me, she could do no better than I.\""
  ];

  const chunk2Text = [
    "Thus as Athene stepped back a pace to watch Arachne finishing her work, she saw that the maiden had taken for her design a pattern of scenes which showed evil or unworthy actions of the gods, how they had deceived fair maidens, resorted to trickery, and appeared on earth from time to time in the form of poor and humble people.",
    "When the goddess saw this insult glowing in bright colors on Arachne's loom, she did not wait while the cloth was judged, but stepped forward, her grey eyes blazing with anger, and tore Arachne's work across.",
    "Then she struck Arachne across the face.",
    "Arachne stood there a moment, struggling with anger, fear, and pride. 'I will not live under this insult,' she cried, and seizing a rope from the wall, she made a noose and would have hanged herself.",
    "The goddess touched the rope and touched the maiden. 'Live on, wicked girl,' she said. 'Live on and spin, both you and your descendants. When men look at you, they may remember that it is not wise to strive with Athene.'",
    "At that the body of Arachne shriveled up, and her legs grew tiny, spindly, and distorted.",
    "There before the eyes of the spectators hung a little dusty brown spider on a slender thread."
  ];

  const summaryChunks = [
    {
      id: 'A',
      text: 'A skilled weaver named Arachne became famous across Greece, but her pride grew so large that she refused to thank the goddess Athene and even challenged her to a weaving contest.',
      correctPos: 0,
      hint: '✅ This is the BEGINNING - it introduces Arachne and shows her pride leading to the challenge'
    },
    {
      id: 'B',
      text: 'Athene appeared disguised as an old woman to warn Arachne, but when Arachne insulted her, the goddess revealed her true form and both began weaving at their looms.',
      correctPos: 1,
      hint: '✅ This comes AFTER the challenge - Athene tests Arachne, then the contest begins'
    },
    {
      id: 'C',
      text: "During the contest, Arachne's anger and pride led her to weave scenes that mocked and insulted the gods.",
      correctPos: 2,
      hint: '✅ This happens DURING the contest - this is the action that Pride causes'
    },
    {
      id: 'D',
      text: "When Athene saw the disrespectful images, she tore Arachne's tapestry and struck the weaver across the face.",
      correctPos: 3,
      hint: '✅ This happens RIGHT AFTER Arachne finishes the insulting weaving - the first punishment'
    },
    {
      id: 'E',
      text: 'As punishment for her pride, Athene transformed Arachne into a spider, doomed to weave forever as a reminder not to challenge the gods.',
      correctPos: 4,
      hint: '✅ This is the FINAL consequence at the END - Arachne\'s ultimate fate'
    }
  ];

  const [availableChunks, setAvailableChunks] = useState([...summaryChunks].sort(() => Math.random() - 0.5));

  const chunk1Hovers = {
    0: {
      type: 'trait',
      text: '🟣 CHARACTER TRAIT: This sentence shows that Arachne is extremely proud. Click it and mark it as a CHARACTER TRAIT!'
    },
    1: {
      type: 'trait',
      text: '🟣 CHARACTER TRAIT: This tells you Arachne only cares about praise - that\'s pride! Click it and mark it as a CHARACTER TRAIT!'
    },
    2: {
      type: 'action',
      text: '🟢 ACTION: Arachne is DOING something here - speaking up to defend herself. Click it and mark it as an ACTION!'
    },
    3: {
      type: 'action',
      text: '🟢 ACTION: Arachne is telling people what she does (or doesn\'t do). This is an ACTION. Click and categorize it!'
    },
    4: {
      type: 'action',
      text: '🟢 ACTION: Arachne refuses to give credit to Athene - that\'s an action showing her pride. Click and mark it as ACTION!'
    },
    5: {
      type: 'action',
      text: '🟢 ACTION: Arachne is bragging about her work. That\'s an ACTION caused by her pride. Click it!'
    },
    6: {
      type: 'action',
      text: '🟢 ACTION: Arachne is challenging the goddess! This is a BIG action. Click and mark it as ACTION!'
    }
  };

  const chunk2Hovers = {
    0: {
      type: 'action',
      text: '🟢 ACTION: Arachne DOES something here - she weaves insulting images of the gods. This is the action her pride causes! Click it!'
    },
    1: {
      type: 'consequence',
      text: '🟠 CONSEQUENCE: Because of Arachne\'s insulting weaving, Athene tears her work. This is what HAPPENS as a result. Click and mark as CONSEQUENCE!'
    },
    2: {
      type: 'consequence',
      text: '🟠 CONSEQUENCE: Athene strikes Arachne - this is punishment for her pride and actions. Click and mark as CONSEQUENCE!'
    },
    3: {
      type: 'trait',
      text: '🟣 CHARACTER TRAIT: Even facing punishment, Arachne\'s pride makes her refuse to accept it. She\'d rather die than admit she was wrong! Click and mark as TRAIT!'
    },
    4: {
      type: 'consequence',
      text: '🟠 CONSEQUENCE: Athene curses Arachne - this is the beginning of the ultimate punishment. Click and mark as CONSEQUENCE!'
    },
    5: {
      type: 'consequence',
      text: '🟠 CONSEQUENCE: Arachne\'s body transforms into a spider. This is the final result of her pride! Click and mark as CONSEQUENCE!'
    },
    6: {
      type: 'consequence',
      text: '🟠 CONSEQUENCE: The transformation is complete - Arachne is now a spider forever. This is the ultimate consequence of challenging the gods! Click it!'
    }
  };

  const handleSentenceClick = (sentence, isChunk1) => {
    setSelectedSentence({ text: sentence, isChunk1 });
  };

  const handleCategorySelect = (category) => {
    if (!selectedSentence) return;

    const highlights = selectedSentence.isChunk1 ? chunk1Highlights : chunk2Highlights;
    const setHighlights = selectedSentence.isChunk1 ? setChunk1Highlights : setChunk2Highlights;

    const categoryMap = {
      trait: 'traits',
      action: 'actions',
      consequence: 'consequences'
    };

    const categoryKey = categoryMap[category];

    if (!highlights[categoryKey].includes(selectedSentence.text)) {
      setHighlights({
        ...highlights,
        [categoryKey]: [...highlights[categoryKey], selectedSentence.text]
      });

      const messages = {
        trait: '🟣 Great! You found a CHARACTER TRAIT!',
        action: '🟢 Excellent! You found an ACTION!',
        consequence: '🟠 Perfect! You found a CONSEQUENCE!'
      };
      setSuccessMessage(messages[category]);
      setTimeout(() => setSuccessMessage(null), 2000);
    }

    setSelectedSentence(null);
  };

  const getSentenceColor = (sentence, isChunk1) => {
    const highlights = isChunk1 ? chunk1Highlights : chunk2Highlights;
    if (highlights.traits.includes(sentence)) return 'bg-purple-200/50 backdrop-blur-lg border-purple-400/60 border-l-4 shadow-lg';
    if (highlights.actions.includes(sentence)) return 'bg-green-200/50 backdrop-blur-lg border-green-400/60 border-l-4 shadow-lg';
    if (highlights.consequences.includes(sentence)) return 'bg-orange-200/50 backdrop-blur-lg border-orange-400/60 border-l-4 shadow-lg';
    if (selectedSentence?.text === sentence) return 'bg-blue-200/50 backdrop-blur-lg border-blue-400/60 border-2 shadow-xl';
    return 'hover:bg-white/30 hover:backdrop-blur-lg border-transparent';
  };

  const canContinueFromChunk1 = () => {
    return chunk1Highlights.traits.length >= 2 && chunk1Highlights.actions.length >= 2;
  };

  const canContinueFromChunk2 = () => {
    return chunk2Highlights.actions.length >= 1 && chunk2Highlights.consequences.length >= 3;
  };

  const handleDragStart = (e, chunk) => {
    dragItem.current = chunk;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (!dragItem.current) return;

    const newOrder = [...summaryOrder];
    const existingIndex = newOrder.indexOf(dragItem.current);
    if (existingIndex !== -1) {
      newOrder[existingIndex] = null;
    }

    const displaced = newOrder[index];
    newOrder[index] = dragItem.current;

    if (displaced) {
      setAvailableChunks([...availableChunks.filter(c => c.id !== dragItem.current.id), displaced]);
    } else {
      setAvailableChunks(availableChunks.filter(c => c.id !== dragItem.current.id));
    }

    setSummaryOrder(newOrder);
    dragItem.current = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkSummaryOrder = () => {
    const results = summaryOrder.map((chunk, idx) => {
      if (!chunk) return false;
      return chunk.correctPos === idx;
    });

    setCheckResult(results);
    setAttempts(attempts + 1);

    if (results.every(r => r === true)) {
      setTimeout(() => setPage(5), 2000);
    }
  };

  const revealAnswer = () => {
    const correctOrder = [...summaryChunks].sort((a, b) => a.correctPos - b.correctPos);
    setSummaryOrder(correctOrder);
    setAvailableChunks([]);
    setShowAnswer(true);
    setCheckResult(correctOrder.map(() => true));
  };

  const generateReport = () => {
    const totalTime = Math.round((Date.now() - startTime) / 60000);

    let report = `=== ARACHNE ASSIGNMENT REPORT ===\n`;
    report += `Student Name: ${studentName}\n`;
    report += `Date: ${new Date().toLocaleDateString()}\n`;
    report += `Completion Time: ${totalTime} minutes\n\n`;

    report += `--- CHUNK 1: CHARACTER TRAITS IDENTIFIED ---\n`;
    chunk1Highlights.traits.forEach(t => report += `• ${t}\n`);
    report += `\n--- CHUNK 1: ACTIONS IDENTIFIED ---\n`;
    chunk1Highlights.actions.forEach(a => report += `• ${a}\n`);
    report += `\n--- CHUNK 1: CONSEQUENCES IDENTIFIED ---\n`;
    chunk1Highlights.consequences.forEach(c => report += `• ${c}\n`);

    report += `\n--- CHUNK 2: CHARACTER TRAITS IDENTIFIED ---\n`;
    chunk2Highlights.traits.forEach(t => report += `• ${t}\n`);
    report += `\n--- CHUNK 2: ACTIONS IDENTIFIED ---\n`;
    chunk2Highlights.actions.forEach(a => report += `• ${a}\n`);
    report += `\n--- CHUNK 2: CONSEQUENCES IDENTIFIED ---\n`;
    chunk2Highlights.consequences.forEach(c => report += `• ${c}\n`);

    report += `\n--- SUMMARY RECONSTRUCTION ---\n`;
    report += `Attempts: ${attempts}\n`;
    report += `Final Result: ${showAnswer ? '❌ Used "Show Answer" after ' + attempts + ' attempts' : '✅ Correct order achieved'}\n`;

    report += `\n--- REFLECTION ---\n`;
    report += `${reflection}\n`;
    report += `\n=================================`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const ProgressBar = () => (
    <div className="flex items-center justify-center gap-2 py-4">
      {[
        { num: 1, label: 'Start', icon: Target },
        { num: 2, label: 'Read 1', icon: Brain },
        { num: 3, label: 'Read 2', icon: Brain },
        { num: 4, label: 'Build', icon: Zap },
        { num: 5, label: 'Done', icon: Award }
      ].map((step, idx) => {
        const Icon = step.icon;
        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all backdrop-blur-xl border-2 ${
                page === step.num
                  ? 'bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white shadow-xl scale-110 border-white/60'
                  : page > step.num
                    ? 'bg-gradient-to-br from-green-500/70 to-green-600/70 text-white border-white/50'
                    : 'bg-white/40 text-gray-600 border-gray-300/60'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs mt-1 font-medium ${page === step.num ? 'text-blue-800' : 'text-gray-600'}`}>
                {step.label}
              </span>
            </div>
            {idx < 4 && (
              <div className={`w-12 h-1 rounded mb-5 transition-all backdrop-blur-lg ${page > step.num ? 'bg-green-500/70 shadow-lg' : 'bg-gray-400/40'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // Back to Top Button Component
  const BackToTopButton = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110 ${
        showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );

  const EvidenceWeb = () => {
    const allHighlights = {
      traits: [...chunk1Highlights.traits, ...chunk2Highlights.traits],
      actions: [...chunk1Highlights.actions, ...chunk2Highlights.actions],
      consequences: [...chunk1Highlights.consequences, ...chunk2Highlights.consequences]
    };

    return (
      <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 border border-white/60 shadow-lg h-full overflow-auto">
        <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1">
          🕸️ Evidence Tracker
          <span className="text-xs font-normal text-gray-700">
            (Watch the connections grow!)
          </span>
        </h3>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="flex items-center gap-1 mb-1 bg-purple-200/40 backdrop-blur-lg p-1 rounded-lg border border-purple-300/60">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="font-bold text-purple-900 text-xs">Traits</span>
            </div>
            <div className="space-y-1">
              {allHighlights.traits.map((t, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-lg p-1 rounded-lg border-l-2 border-purple-600 shadow">
                  <p className="text-xs leading-tight">{t.substring(0, 50)}...</p>
                </div>
              ))}
              {allHighlights.traits.length === 0 && (
                <div className="text-gray-500 italic text-xs p-2 border border-dashed border-gray-400/50 rounded-lg bg-white/20">
                  Click sentences to add
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            {allHighlights.traits.length > 0 && allHighlights.actions.length > 0 && (
              <div className="text-center">
                <ArrowRight className="text-blue-600 mx-auto" size={16} />
                <p className="text-xs font-semibold text-blue-800">drives</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1 bg-green-200/40 backdrop-blur-lg p-1 rounded-lg border border-green-300/60">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="font-bold text-green-900 text-xs">Actions</span>
            </div>
            <div className="space-y-1">
              {allHighlights.actions.map((a, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-lg p-1 rounded-lg border-l-2 border-green-600 shadow">
                  <p className="text-xs leading-tight">{a.substring(0, 50)}...</p>
                </div>
              ))}
              {allHighlights.actions.length === 0 && (
                <div className="text-gray-500 italic text-xs p-2 border border-dashed border-gray-400/50 rounded-lg bg-white/20">
                  Click sentences to add
                </div>
              )}
            </div>
          </div>
        </div>

        {allHighlights.consequences.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/40">
            <div className="text-center mb-1">
              <ArrowRight className="text-blue-600 mx-auto rotate-90" size={16} />
              <p className="text-xs font-semibold text-blue-800">leads to</p>
            </div>
            <div className="flex items-center gap-1 mb-1 bg-orange-200/40 backdrop-blur-lg p-1 rounded-lg max-w-md mx-auto border border-orange-300/60">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span className="font-bold text-orange-900 text-xs">Consequences</span>
            </div>
            <div className="space-y-1 max-w-2xl mx-auto">
              {allHighlights.consequences.map((c, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-lg p-1 rounded-lg border-l-2 border-orange-600 shadow">
                  <p className="text-xs leading-tight">{c.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (page === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Fixed Progress Bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <ProgressBar />
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-10 lg:p-12 border border-white/60 space-y-10">
              <div className="text-center" id="intro-section">
              <div className="inline-block bg-white/50 backdrop-blur-lg text-purple-900 px-6 py-2 rounded-full text-sm font-bold mb-4 border border-white/60 shadow-lg">
                ✨ INTERACTIVE CLOSE READING
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-3">
                Arachne
              </h1>
              <p className="text-xl text-gray-700 mb-6">Evidence Detective Challenge</p>

              <div className="bg-white/30 backdrop-blur-xl p-6 rounded-2xl border border-white/60 shadow-lg">
                <p className="text-sm font-bold text-gray-800 mb-2">🎯 WHAT YOU'LL LEARN</p>
                <p className="text-lg font-semibold text-gray-900">
                  How does Arachne's pride cause all the events in the story?
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  You'll find evidence showing: Pride → Actions → Consequences
                </p>
              </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/60 shadow-lg" id="name-section">
              <label className="block text-xl font-bold text-gray-900 mb-3">👤 Enter Your Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-4 bg-white/50 backdrop-blur-lg border border-white/60 rounded-2xl text-xl focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all shadow-lg"
                placeholder="Type your name here..."
              />
              </div>

              <div className="bg-white/30 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/60 shadow-lg" id="steps-section">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 5 Simple Steps:</h2>
              <div className="space-y-4">
                {[
                  { icon: '📖', text: 'Read 2 short passages from "Arachne"', detail: 'Hover over sentences to see helpful hints!' },
                  { icon: '🖱️', text: 'Click sentences and sort them', detail: 'Is it a trait, action, or consequence?' },
                  { icon: '🕸️', text: 'Watch your evidence tracker grow', detail: 'See how pride leads to actions leads to consequences' },
                  { icon: '🧩', text: 'Drag story pieces into order', detail: 'Put the 8 events in the right order' },
                  { icon: '✍️', text: 'Write a short reflection', detail: 'Explain how pride caused everything' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white/40 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/60">
                    <span className="text-3xl">{step.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-lg">{step.text}</p>
                      <p className="text-gray-700 text-sm mt-1">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>

              <div className="bg-yellow-100/40 backdrop-blur-xl border-4 border-yellow-400/60 rounded-2xl p-6 md:p-8 shadow-lg" id="tips-section">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                ⭐ PRO TIP: Hover for Hints!
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Throughout this activity, <strong>put your mouse over sentences and story pieces</strong> to see helpful hints.
                These hints tell you EXACTLY what to do, so use them!
              </p>
              </div>

              <button
                onClick={() => setPage(2)}
                disabled={!studentName.trim()}
                className="w-full py-5 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-xl text-white text-2xl font-bold rounded-2xl hover:from-blue-600/90 hover:to-purple-600/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none border border-white/40"
              >
                🚀 Start the Challenge
              </button>
            </div>
          </div>
        </div>
        <BackToTopButton />
      </div>
    );
  }

  if (page === 2 || page === 3) {
    const isChunk1 = page === 2;
    const textArray = isChunk1 ? chunk1Text : chunk2Text;
    const hovers = isChunk1 ? chunk1Hovers : chunk2Hovers;
    const canContinue = isChunk1 ? canContinueFromChunk1() : canContinueFromChunk2();
    const highlights = isChunk1 ? chunk1Highlights : chunk2Highlights;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Fixed Progress Bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <ProgressBar />
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Visual Reference Image */}
            <div className="bg-white/40 backdrop-blur-2xl rounded-2xl shadow-xl p-4 border border-white/60">
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">🎨 The Story of Arachne - Visual Reference</h3>
              <img
                src="/images/arachne-weaving.jpg"
                alt="Arachne and Athene weaving contest - showing Arachne at her loom on the left and Athene on the right"
                className="w-full h-auto rounded-xl shadow-lg"
                style={{ maxHeight: '300px', objectFit: 'cover', objectPosition: 'center' }}
              />
              <p className="text-sm text-gray-700 mt-2 text-center italic">
                Arachne (left) and Athene (right) in their weaving contest - notice Arachne's pride in her posture!
              </p>
            </div>

            {/* Header Section */}
            <div className="bg-white/40 backdrop-blur-2xl rounded-2xl shadow-xl p-4 md:p-6 border border-white/60">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {isChunk1 ? '📖 Chunk 1: Pride Established' : '📖 Chunk 2: Pride Creates Action'}
              </h2>
            </div>

            {isChunk1 && (
              <div className="bg-yellow-100/40 backdrop-blur-xl border-2 border-yellow-400/60 rounded-xl p-2 mb-2 shadow-lg">
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  📚 How This Works:
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                    <span className="text-lg">1️⃣</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">HOVER sentences</p>
                      <p className="text-xs text-gray-700">See hints appear</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                    <span className="text-lg">2️⃣</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">CLICK to select</p>
                      <p className="text-xs text-gray-700">Turns blue</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                    <span className="text-lg">3️⃣</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">PICK category</p>
                      <p className="text-xs text-gray-700">Trait/Action/Result</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white/30 backdrop-blur-xl p-2 rounded-xl mb-2 border border-white/60 shadow-lg">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-xl font-bold text-purple-700">{highlights.traits.length}</div>
                  <div className="text-xs font-semibold text-gray-800">🟣 Traits</div>
                  <div className="text-xs text-gray-600">{isChunk1 ? 'Need: 2' : 'Optional'}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-700">{highlights.actions.length}</div>
                  <div className="text-xs font-semibold text-gray-800">🟢 Actions</div>
                  <div className="text-xs text-gray-600">{isChunk1 ? 'Need: 2' : 'Need: 1'}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-700">{highlights.consequences.length}</div>
                  <div className="text-xs font-semibold text-gray-800">🟠 Results</div>
                  <div className="text-xs text-gray-600">{isChunk1 ? 'Optional' : 'Need: 3'}</div>
                </div>
              </div>
              {!canContinue && (
                <div className="mt-1 text-center text-red-700 font-bold text-xs">
                  ⚠️ Find more evidence to continue!
                </div>
              )}
            </div>

            <div className="bg-white/20 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-white/60 shadow-lg">
              <p className="text-xs font-bold text-gray-800 mb-1 text-center">
                👆 HOVER OVER SENTENCES FOR HINTS 👆
              </p>

              <div className={`z-20 mb-2 transition-all ${selectedSentence ? 'opacity-100' : 'opacity-50'}`}>
                <div className="bg-gradient-to-r from-white/80 to-white/70 backdrop-blur-xl rounded-lg p-2 border border-white/60 shadow-xl">
                  <p className="text-xs font-bold text-gray-700 mb-1 text-center">
                    {selectedSentence ? '👇 Click a category button:' : 'Click a sentence first, then click its category:'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleCategorySelect('trait')}
                      disabled={!selectedSentence}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-br from-purple-500/80 to-purple-600/80 backdrop-blur-lg text-white rounded-lg hover:from-purple-600/90 hover:to-purple-700/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed font-bold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40"
                    >
                      <span className="text-sm">🟣</span>
                      <span>Trait</span>
                    </button>
                    <button
                      onClick={() => handleCategorySelect('action')}
                      disabled={!selectedSentence}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-br from-green-500/80 to-green-600/80 backdrop-blur-lg text-white rounded-lg hover:from-green-600/90 hover:to-green-700/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed font-bold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40"
                    >
                      <span className="text-sm">🟢</span>
                      <span>Action</span>
                    </button>
                    <button
                      onClick={() => handleCategorySelect('consequence')}
                      disabled={!selectedSentence}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-br from-orange-500/80 to-orange-600/80 backdrop-blur-lg text-white rounded-lg hover:from-orange-600/90 hover:to-orange-700/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed font-bold text-xs shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40"
                    >
                      <span className="text-sm">🟠</span>
                      <span>Consequence</span>
                    </button>
                  </div>
                  {selectedSentence && (
                    <div className="mt-2 text-center">
                      <button
                        onClick={() => setSelectedSentence(null)}
                        className="text-xs text-gray-600 hover:text-gray-900 underline"
                      >
                        Cancel (pick different sentence)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {textArray.map((sentence, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div
                      onClick={() => handleSentenceClick(sentence, isChunk1)}
                      className={`flex-1 p-2 rounded-lg border-2 cursor-pointer transition-all text-sm leading-relaxed ${getSentenceColor(sentence, isChunk1)}`}
                    >
                      {sentence}
                    </div>
                    {hovers[idx] && (
                      <div className="flex-shrink-0 group relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg cursor-help transition-all hover:scale-110 ${
                          hovers[idx].type === 'trait' ? 'bg-purple-100 hover:bg-purple-200' :
                          hovers[idx].type === 'action' ? 'bg-green-100 hover:bg-green-200' :
                          'bg-orange-100 hover:bg-orange-200'
                        }`}>
                          {hovers[idx].type === 'trait' ? '🟣' :
                           hovers[idx].type === 'action' ? '🟢' : '🟠'}
                        </div>
                        <div className="absolute hidden group-hover:block bg-gray-900/95 text-white p-2 rounded-lg text-xs w-64 -left-56 top-0 z-30 shadow-xl">
                          <div className="font-semibold mb-1">
                            {hovers[idx].type === 'trait' ? 'CHARACTER TRAIT' :
                             hovers[idx].type === 'action' ? 'ACTION' : 'CONSEQUENCE'}
                          </div>
                          <div className="leading-snug">{hovers[idx].text.replace(/[🟣🟢🟠]/g, '').replace('CHARACTER TRAIT:', '').replace('ACTION:', '').replace('CONSEQUENCE:', '').trim()}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {successMessage && (
              <div className="bg-gradient-to-r from-green-200/50 to-green-300/50 backdrop-blur-xl border-4 border-green-500/60 rounded-2xl p-6 mb-6 text-center animate-bounce shadow-xl">
                <CheckCircle className="text-green-700 mx-auto mb-2" size={48} />
                <p className="text-2xl font-bold text-green-900">{successMessage}</p>
              </div>
            )}
          </div>

            {/* Evidence Tracker Section */}
            <div className="bg-white/40 backdrop-blur-2xl rounded-2xl shadow-xl p-4 md:p-6 border border-white/60">
            <div className="bg-white/30 backdrop-blur-xl p-2 rounded-xl mb-2 border border-white/60">
              <p className="text-center text-sm font-bold text-gray-900">
                📊 EVIDENCE TRACKER
              </p>
              <p className="text-center text-xs text-gray-700">
                Pride (trait) → Actions → Consequences
              </p>
            </div>
            <EvidenceWeb />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
            {page > 2 && (
              <button
                onClick={() => setPage(page - 1)}
                className="py-2 px-4 bg-gray-400/60 backdrop-blur-xl text-gray-900 text-sm font-bold rounded-xl hover:bg-gray-500/70 shadow-lg border border-white/40"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => setPage(page + 1)}
              disabled={!canContinue}
              className="flex-1 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-xl text-white text-sm font-bold rounded-xl hover:from-blue-600/90 hover:to-purple-600/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40"
            >
              {isChunk1 ? 'Continue to Chunk 2 →' : 'Build the Story →'}
            </button>
            </div>
          </div>
        </div>
        <BackToTopButton />
      </div>
    );
  }

  if (page === 4) {
    const allSlotsFilled = summaryOrder.every(slot => slot !== null);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Fixed Progress Bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <ProgressBar />
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-white/40 backdrop-blur-2xl rounded-2xl shadow-xl p-4 md:p-6 border border-white/60">
            <h2 className="text-xl font-bold text-gray-900 mb-1">🧩 Put the Story in Order</h2>
            <p className="text-sm text-gray-700 mb-2">Drag story pieces from the bottom into the numbered boxes</p>

            <div className="bg-yellow-100/40 backdrop-blur-xl border-2 border-yellow-400/60 rounded-xl p-2 mb-2 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-1">📚 How to Do This:</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                  <span className="text-lg">1️⃣</span>
                  <div>
                    <p className="font-bold text-xs text-gray-900">READ pieces</p>
                    <p className="text-xs text-gray-700">Hover for hints!</p>
                  </div>
                </div>
                <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                  <span className="text-lg">2️⃣</span>
                  <div>
                    <p className="font-bold text-xs text-gray-900">DRAG to box</p>
                    <p className="text-xs text-gray-700">Place in order</p>
                  </div>
                </div>
                <div className="flex items-start gap-1 bg-white/50 backdrop-blur-lg p-2 rounded-lg border border-white/60">
                  <span className="text-lg">3️⃣</span>
                  <div>
                    <p className="font-bold text-xs text-gray-900">FILL all 5</p>
                    <p className="text-xs text-gray-700">Then check!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-200/40 backdrop-blur-xl p-2 rounded-xl mb-2 text-center border border-blue-300/60 shadow-lg">
              <div className="text-lg font-bold text-blue-900">
                {summaryOrder.filter(s => s !== null).length} / 5 boxes filled
              </div>
              {!allSlotsFilled && (
                <p className="text-sm text-blue-800 mt-1">Keep going! Fill all 5 boxes to check your answer.</p>
              )}
              {allSlotsFilled && !checkResult && (
                <p className="text-sm text-green-800 mt-1 font-bold">✅ All filled! Now click "Check My Order" below!</p>
              )}
            </div>

            <div className="mb-2 bg-white/20 backdrop-blur-xl p-2 rounded-xl border border-white/60 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-1 text-center">📖 The Story in Order (Beginning → End)</h3>
              <div className="space-y-1">
                {summaryOrder.map((chunk, idx) => (
                  <div
                    key={idx}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragOver={handleDragOver}
                    className={`min-h-14 p-2 rounded-lg border-2 transition-all backdrop-blur-xl shadow ${
                      checkResult
                        ? checkResult[idx]
                          ? 'bg-gradient-to-r from-green-100/50 to-green-200/50 border-green-500/60'
                          : 'bg-gradient-to-r from-red-100/50 to-red-200/50 border-red-500/60'
                        : chunk
                          ? 'bg-white/40 border-blue-400/60'
                          : 'border-gray-400/50 border-dashed bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 backdrop-blur-lg ${
                        checkResult && checkResult[idx]
                          ? 'bg-green-500/80 text-white border border-white/40'
                          : 'bg-blue-600/80 text-white border border-white/40'
                      }`}>
                        {idx + 1}
                      </div>
                      {chunk ? (
                        <div
                          className="flex-1 cursor-move hover:opacity-80 transition-opacity"
                          draggable
                          onDragStart={(e) => handleDragStart(e, chunk)}
                          title="Drag to rearrange"
                        >
                          <p className="text-xs leading-tight">{chunk.text}</p>
                          {checkResult && (
                            <div className="mt-1">
                              {checkResult[idx] ? (
                                <span className="text-green-700 font-bold text-xs flex items-center gap-1">
                                  <CheckCircle size={12} /> Correct!
                                </span>
                              ) : (
                                <div className="text-red-700 text-xs">
                                  <p className="font-bold">❌ Wrong spot</p>
                                  <p className="mt-1">💡 {chunk.hint}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic text-xs">👆 Drag a story piece here...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl p-2 rounded-xl border border-white/60 shadow-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-1">📦 Story Pieces - Drag These Up!</h3>
              <p className="text-xs text-gray-700 mb-2">
                ⭐ <strong>TIP:</strong> Hover for hints!
              </p>
              <div className="grid grid-cols-2 gap-2">
                {availableChunks.map(chunk => (
                  <div
                    key={chunk.id}
                    className="relative group"
                  >
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, chunk)}
                      className="p-2 bg-white/50 backdrop-blur-lg border border-white/60 rounded-lg cursor-move hover:border-blue-500/60 hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-4 h-4 bg-blue-500/80 backdrop-blur-lg text-white rounded-full flex items-center justify-center text-xs font-bold border border-white/40">
                          {chunk.id}
                        </div>
                        <span className="text-xs text-gray-600">Hover for hint</span>
                      </div>
                      <p className="text-xs leading-tight">{chunk.text}</p>
                    </div>
                    <div className="absolute hidden group-hover:block bg-yellow-100/95 backdrop-blur-sm text-gray-800 p-3 rounded-lg text-sm top-full left-0 right-0 mt-2 z-50 shadow-lg border border-yellow-300 pointer-events-none">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-base">💡</span>
                        <span className="text-xs font-semibold uppercase tracking-wide">Hint:</span>
                      </div>
                      <p className="leading-snug text-xs">{chunk.hint}</p>
                    </div>
                  </div>
                ))}
                {availableChunks.length === 0 && (
                  <div className="col-span-2 text-center p-8 text-gray-600">
                    <p className="text-xl">✅ All pieces placed! Now check your order.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <button
                onClick={checkSummaryOrder}
                disabled={!allSlotsFilled || checkResult !== null}
                className="w-full py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-xl text-white text-sm font-bold rounded-xl hover:from-blue-600/90 hover:to-purple-600/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40"
              >
                {!allSlotsFilled ? '⚠️ Fill All 5 Boxes First' : '✅ Check My Order'}
              </button>

              {checkResult && !checkResult.every(r => r) && (
                <>
                  <div className="bg-yellow-200/40 backdrop-blur-xl border border-yellow-400/60 rounded-lg p-2 text-center shadow-lg">
                    <p className="font-bold text-xs text-gray-900">
                      🔄 You have {3 - attempts} {attempts === 2 ? 'attempt' : 'attempts'} left
                    </p>
                    <p className="text-xs text-gray-700">Read the hints and try again!</p>
                  </div>

                  <button
                    onClick={() => {
                      setCheckResult(null);
                      setSummaryOrder([null, null, null, null, null]);
                      setAvailableChunks([...summaryChunks].sort(() => Math.random() - 0.5));
                    }}
                    className="w-full py-2 bg-gray-600/80 backdrop-blur-xl text-white text-sm font-bold rounded-xl hover:bg-gray-700/90 shadow-lg border border-white/40"
                  >
                    🔄 Try Again
                  </button>

                  {attempts >= 3 && (
                    <button
                      onClick={revealAnswer}
                      className="w-full py-2 bg-orange-500/80 backdrop-blur-xl text-white text-sm font-bold rounded-xl hover:bg-orange-600/90 shadow-lg border border-white/40"
                    >
                      💡 Show Me the Correct Order
                    </button>
                  )}
                </>
              )}
            </div>
            </div>
          </div>
        </div>
        <BackToTopButton />
      </div>
    );
  }

  if (page === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Fixed Progress Bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <ProgressBar />
          </div>
        </div>

        <div className="p-6 md:p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-8 md:p-10 lg:p-12 border border-white/60 space-y-10">
              {/* Success Header */}
              <div className="text-center" id="success-section">
              <div className="inline-block mb-4">
                <Award className="text-yellow-600 mx-auto" size={80} />
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Excellent Work!
              </h2>
              <p className="text-2xl text-gray-700">You've completed the Arachne analysis</p>
              </div>

              {/* Performance Section */}
              <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-lg" id="performance-section">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 Your Performance</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center border border-white/60">
                  <div className="text-5xl font-bold text-purple-700 mb-2">
                    {chunk1Highlights.traits.length + chunk2Highlights.traits.length}
                  </div>
                  <p className="text-lg font-semibold text-gray-800">🟣 Character Traits</p>
                </div>
                <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center border border-white/60">
                  <div className="text-5xl font-bold text-green-700 mb-2">
                    {chunk1Highlights.actions.length + chunk2Highlights.actions.length}
                  </div>
                  <p className="text-lg font-semibold text-gray-800">🟢 Actions</p>
                </div>
                <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center border border-white/60">
                  <div className="text-5xl font-bold text-orange-700 mb-2">
                    {chunk1Highlights.consequences.length + chunk2Highlights.consequences.length}
                  </div>
                  <p className="text-lg font-semibold text-gray-800">🟠 Consequences</p>
                </div>
              </div>
              </div>

              {/* Reflection Section */}
              <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-lg" id="reflection-section">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✍️ Final Reflection (Required)</h3>
              <div className="bg-blue-100/40 backdrop-blur-lg border-2 border-blue-400/60 rounded-2xl p-4 mb-4">
                <p className="text-lg font-bold text-gray-900 mb-2">📝 Write 3-5 sentences answering this question:</p>
                <p className="text-xl font-semibold text-blue-900">
                  How did Arachne's pride (character trait) cause the events and consequences in the story?
                </p>
                <div className="mt-3 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Your answer should include:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>What Arachne's pride made her do (actions)</li>
                    <li>What happened because of those actions (consequences)</li>
                    <li>An example from the story to support your answer</li>
                  </ul>
                </div>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full p-5 bg-white/50 backdrop-blur-lg border border-white/60 rounded-2xl text-lg focus:border-blue-500/60 focus:outline-none focus:ring-4 focus:ring-blue-200/50 resize-none shadow-lg"
                rows="8"
                placeholder="Start writing here... Remember to use complete sentences and explain your thinking!"
              />
              {reflection.trim() && (
                <div className="mt-3 text-sm text-gray-700">
                  <p>✅ Word count: {reflection.trim().split(/\s+/).length} words</p>
                </div>
              )}
              </div>

              {/* Submit Section */}
              <div className="bg-yellow-100/40 backdrop-blur-xl border-3 border-yellow-400/60 rounded-2xl p-8 shadow-lg" id="submit-section">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Submit Your Work:</h3>
              <ol className="space-y-3 text-lg text-gray-800 mb-6">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 text-xl">1.</span>
                  <span>Click the <strong>"Copy Report"</strong> button below</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 text-xl">2.</span>
                  <span>Open your assignment in <strong>Google Classroom</strong> or <strong>Canvas</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-700 text-xl">3.</span>
                  <span>Paste (Ctrl+V or Cmd+V) your report and submit</span>
                </li>
              </ol>

              <button
                onClick={generateReport}
                disabled={!reflection.trim()}
                className="w-full py-5 bg-gradient-to-r from-green-500/80 to-blue-500/80 backdrop-blur-xl text-white text-2xl font-bold rounded-2xl hover:from-green-600/90 hover:to-blue-600/90 disabled:from-gray-400/50 disabled:to-gray-400/50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none transition-all border border-white/40 flex items-center justify-center gap-3"
              >
                {copied ? (
                  <>
                    <CheckCircle size={28} />
                    Report Copied! Now paste it in your assignment.
                  </>
                ) : (
                  <>
                    <Copy size={28} />
                    Copy Report to Clipboard
                  </>
                )}
              </button>
              {!reflection.trim() && (
                <p className="text-center mt-3 text-red-700 font-semibold">
                  ⚠️ Please write your reflection before copying the report!
                </p>
              )}
              </div>

              {/* Final Message */}
              <div className="text-center text-gray-700">
                <p className="text-lg">🎉 Great job completing this analysis!</p>
                <p className="text-base mt-2">Remember to submit your report to your teacher.</p>
              </div>
            </div>
          </div>
        </div>
        <BackToTopButton />
      </div>
    );
  }

  return null;
};

export default ArachneApp;