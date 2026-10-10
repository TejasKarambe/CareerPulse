import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input, Select, Textarea } from '../ui/Input';
import { STAGES, WORK_ARRANGEMENTS, EMPLOYMENT_TYPES, CURRENCIES } from '../../utils/constants';
import { Plus, Trash2, Calendar, HelpCircle } from 'lucide-react';

export const ApplicationForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    jobTitle: initialData?.jobTitle || '',
    status: initialData?.status || 'applied',
    location: initialData?.location || '',
    workArrangement: initialData?.workArrangement || 'Remote',
    employmentType: initialData?.employmentType || 'Full-time',
    salaryMin: initialData?.salaryMin || '',
    salaryMax: initialData?.salaryMax || '',
    currency: initialData?.currency || 'USD ($)',
    appliedDate: initialData?.appliedDate || new Date().toISOString().slice(0, 10),
    url: initialData?.url || '',
    description: initialData?.description || '',
    rating: initialData?.rating || 4,
    notes: initialData?.notes || '',
    tags: initialData?.tags ? initialData.tags.join(', ') : '',
    interviewDates: initialData?.interviewDates || [],
    interviewQuestions: initialData?.interviewQuestions || [],
  });

  const [activeTab, setActiveTab] = useState('details'); // details, interviews, questions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Interview round
  const addInterviewRound = () => {
    setFormData((prev) => ({
      ...prev,
      interviewDates: [
        ...prev.interviewDates,
        {
          id: `iv-${Date.now()}`,
          round: 'Round ' + (prev.interviewDates.length + 1),
          date: new Date().toISOString().slice(0, 16),
          interviewer: '',
          notes: ''
        }
      ]
    }));
  };

  const removeInterviewRound = (index) => {
    setFormData((prev) => ({
      ...prev,
      interviewDates: prev.interviewDates.filter((_, i) => i !== index)
    }));
  };

  const updateInterviewRound = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.interviewDates];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, interviewDates: updated };
    });
  };

  // Add Question
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      interviewQuestions: [
        ...prev.interviewQuestions,
        {
          id: `q-${Date.now()}`,
          question: '',
          answer: '',
          difficulty: 'Medium'
        }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      interviewQuestions: prev.interviewQuestions.filter((_, i) => i !== index)
    }));
  };

  const updateQuestion = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.interviewQuestions];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, interviewQuestions: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.jobTitle.trim()) {
      alert('Please provide Company Name and Job Title');
      return;
    }

    const payload = {
      ...initialData,
      ...formData,
      salaryMin: formData.salaryMin ? Number(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? Number(formData.salaryMax) : null,
      rating: Number(formData.rating),
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.tags
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 gap-2 text-sm">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            activeTab === 'details'
              ? 'theme-btn-primary shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          General Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('interviews')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'interviews'
              ? 'theme-btn-primary shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar size={14} />
          <span>Interviews ({formData.interviewDates.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'questions'
              ? 'theme-btn-primary shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle size={14} />
          <span>Interview Q&A ({formData.interviewQuestions.length})</span>
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name *"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Google, Stripe, Linear"
              required
            />
            <Input
              label="Job Role / Title *"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Pipeline Stage"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </Select>

            <Select
              label="Work Arrangement"
              name="workArrangement"
              value={formData.workArrangement}
              onChange={handleChange}
            >
              {WORK_ARRANGEMENTS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </Select>

            <Select
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              {EMPLOYMENT_TYPES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <Input
              label="Min Salary (Annual)"
              name="salaryMin"
              type="number"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="120000"
            />

            <Input
              label="Max Salary (Annual)"
              name="salaryMax"
              type="number"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="160000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA or Remote"
            />

            <Input
              label="Application Date"
              name="appliedDate"
              type="date"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job URL"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://..."
            />

            <Input
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, TypeScript, GraphQL"
            />
          </div>

          <Textarea
            label="Job Description / Requirements"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Paste role requirements, key bullet points..."
            rows={3}
          />

          <Textarea
            label="Personal Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Referral contact, recruiter insights, follow-up items..."
            rows={2}
          />
        </div>
      )}

      {/* Interviews Tab */}
      {activeTab === 'interviews' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-500">Track scheduled rounds, interviews, and panel meetings.</p>
            <Button size="sm" variant="outline" onClick={addInterviewRound}>
              <Plus size={14} />
              Add Round
            </Button>
          </div>

          {formData.interviewDates.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
              No interview rounds added yet. Click &quot;Add Round&quot; to schedule one.
            </div>
          ) : (
            formData.interviewDates.map((iv, idx) => (
              <div key={iv.id || idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Round #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeInterviewRound(idx)}
                    className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    placeholder="Round Name (e.g. System Design)"
                    value={iv.round}
                    onChange={(e) => updateInterviewRound(idx, 'round', e.target.value)}
                  />
                  <Input
                    type="datetime-local"
                    value={iv.date}
                    onChange={(e) => updateInterviewRound(idx, 'date', e.target.value)}
                  />
                  <Input
                    placeholder="Interviewer name / role"
                    value={iv.interviewer}
                    onChange={(e) => updateInterviewRound(idx, 'interviewer', e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Round notes, preparation checklist, or feedback..."
                  value={iv.notes}
                  onChange={(e) => updateInterviewRound(idx, 'notes', e.target.value)}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-500">Record technical and behavioral questions asked during your interviews.</p>
            <Button size="sm" variant="outline" onClick={addQuestion}>
              <Plus size={14} />
              Add Question
            </Button>
          </div>

          {formData.interviewQuestions.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
              No interview questions logged yet. Click &quot;Add Question&quot; to log your interview experience.
            </div>
          ) : (
            formData.interviewQuestions.map((q, idx) => (
              <div key={q.id || idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(idx)}
                    className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
                <Input
                  placeholder="What question did they ask?"
                  value={q.question}
                  onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                />
                <Textarea
                  placeholder="How did you answer or how would you answer next time?"
                  value={q.answer}
                  rows={2}
                  onChange={(e) => updateQuestion(idx, 'answer', e.target.value)}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Application
        </Button>
      </div>
    </form>
  );
};
