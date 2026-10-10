import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  Kanban,
  Calendar,
  BarChart3,
  BookOpenCheck,
  Palette,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Plus
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to CareerPulse!',
    subtitle: 'Step 1 of 5 • Introduction',
    icon: Sparkles,
    content: (
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          CareerPulse is your all-in-one personal <strong>Job Application Tracker</strong> designed to keep your job hunt organized, proactive, and stress-free.
        </p>
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Key Advantages:</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <li><strong>100% Offline & Private:</strong> Stored locally in your browser's IndexedDB.</li>
            <li><strong>Persistent Customizations:</strong> Theme and layout stored in browser cookies.</li>
            <li><strong>Zero Setup Required:</strong> Ready right out of the box!</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Interactive Kanban Pipeline',
    subtitle: 'Step 2 of 5 • Applications Management',
    icon: Kanban,
    content: (
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Organize your opportunities across 5 distinct pipeline stages:
        </p>
        <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-semibold">
          <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800">Applied</div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-200 dark:border-amber-800">Screening</div>
          <div className="p-2 bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-lg border border-sky-200 dark:border-sky-800">Interview</div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-800">Offer 🎉</div>
          <div className="p-2 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-800">Rejected</div>
        </div>
        <p className="text-xs text-slate-500">
          💡 <em>Tip: Drag and drop cards between stages seamlessly. When you drag an application to <strong>Offer</strong>, celebrate with instant confetti!</em>
        </p>
      </div>
    ),
  },
  {
    title: 'Adding Applications & Interview Logs',
    subtitle: 'Step 3 of 5 • Job Details & Questionnaire',
    icon: Plus,
    content: (
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Click the <span className="font-semibold text-slate-900 dark:text-white">&quot;+ New Application&quot;</span> button in the top navigation bar anytime to add a job with:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <strong>Compensation & Location:</strong> Track remote/hybrid status, min/max salary brackets, and currencies.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <strong>Interview Rounds:</strong> Schedule round dates, assign interviewer names, and prepare notes.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <strong>Question Bank:</strong> Log exact technical & behavioral questions asked by interviewers.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <strong>Skill Tags:</strong> Tag by technologies (React, Node, etc.) to filter quickly.
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Calendar & Analytics Dashboard',
    subtitle: 'Step 4 of 5 • Schedule & Metrics',
    icon: BarChart3,
    content: (
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Never miss an interview again and track your personal job search metrics:
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <Calendar size={16} className="text-sky-500 shrink-0 mt-0.5" />
            <div>
              <strong>Interview Calendar:</strong> View all scheduled technical screens and on-sites grouped by date in an interactive month calendar.
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <BarChart3 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong>Analytics & Conversion Rates:</strong> Monitor conversion funnel drop-offs, application velocity over time, and salary brackets with Recharts graphs.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Color Themes & Data Backup',
    subtitle: 'Step 5 of 5 • Customization & Safety',
    icon: Palette,
    content: (
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Personalize CareerPulse according to your taste:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <li><strong>Theme Mode:</strong> Switch between Light, Dark, or System Sync.</li>
          <li><strong>Multi-Color Palettes:</strong> Choose from Electric Indigo, Emerald Mint, Royal Purple, Crimson Rose, Warm Sunset, or Ocean Cyan.</li>
          <li><strong>JSON Backup:</strong> Export your data anytime to keep a backup or import onto another device.</li>
        </ul>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-medium">
          You are all set! Add your first job application and start tracking.
        </div>
      </div>
    ),
  },
];

export const TutorialModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  const nextStep = () => {
    if (isLast) {
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step.title}
      subtitle={step.subtitle}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Step Indicator Progress Bar */}
        <div className="flex items-center gap-1.5 w-full">
          {TUTORIAL_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                idx <= currentStep
                  ? 'theme-btn-primary'
                  : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="py-2">
          {step.content}
        </div>

        {/* Step Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={nextStep}
          >
            <span>{isLast ? 'Get Started' : 'Next Step'}</span>
            {isLast ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
