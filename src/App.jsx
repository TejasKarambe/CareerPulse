import React, { useState, useRef, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/analytics/DashboardView';
import { ApplicationsView } from './components/applications/ApplicationsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { InterviewCalendar } from './components/calendar/InterviewCalendar';
import { CompaniesView } from './components/companies/CompaniesView';
import { InterviewNotesView } from './components/notes/InterviewNotesView';
import { SettingsView } from './components/settings/SettingsView';
import { ApplicationForm } from './components/applications/ApplicationForm';
import { ApplicationDetailModal } from './components/applications/ApplicationDetailModal';
import { TutorialModal } from './components/tutorial/TutorialModal';
import { Modal } from './components/ui/Modal';
import gsap from 'gsap';

export function App() {
  const {
    activeTab,
    applications,
    upsertApplication,
    removeApplication,
    loading,
    tutorialOpen,
    completeTutorial
  } = useApp();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [defaultStageForNew, setDefaultStageForNew] = useState('applied');

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const mainContentRef = useRef(null);

  // Animate view transition with GSAP
  useEffect(() => {
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const handleOpenNewModal = (stage = 'applied') => {
    setEditingApp(null);
    setDefaultStageForNew(stage);
    setFormModalOpen(true);
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setFormModalOpen(true);
  };

  const handleSaveApp = async (formData) => {
    await upsertApplication(formData);
    setFormModalOpen(false);
    setEditingApp(null);
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Navbar onOpenNewModal={() => handleOpenNewModal('applied')} />

        <main ref={mainContentRef} className="p-6 md:p-8 flex-1">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 theme-border-primary"></div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  onSelectApp={handleViewDetails}
                  onOpenNewModal={() => handleOpenNewModal('applied')}
                />
              )}

              {activeTab === 'applications' && (
                <ApplicationsView
                  onOpenNewModal={() => handleOpenNewModal('applied')}
                  onAddInStage={(stage) => handleOpenNewModal(stage)}
                  onEditApp={handleEditApp}
                  onDeleteApp={removeApplication}
                  onViewDetails={handleViewDetails}
                />
              )}

              {activeTab === 'calendar' && (
                <InterviewCalendar onSelectApp={handleViewDetails} />
              )}

              {activeTab === 'analytics' && <AnalyticsView />}

              {activeTab === 'companies' && (
                <CompaniesView onSelectApp={handleViewDetails} />
              )}

              {activeTab === 'notes' && (
                <InterviewNotesView onSelectApp={handleViewDetails} />
              )}

              {activeTab === 'settings' && <SettingsView />}
            </>
          )}
        </main>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingApp(null);
        }}
        title={editingApp ? `Edit ${editingApp.companyName} Application` : 'Add New Application'}
        subtitle="Fill in job details, interviews, and questionnaire notes."
        maxWidth="max-w-2xl"
      >
        <ApplicationForm
          initialData={editingApp || { status: defaultStageForNew }}
          onSave={handleSaveApp}
          onCancel={() => {
            setFormModalOpen(false);
            setEditingApp(null);
          }}
        />
      </Modal>

      {/* Detail Drawer Modal */}
      <ApplicationDetailModal
        app={selectedApp}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedApp(null);
        }}
        onEdit={(app) => {
          setDetailModalOpen(false);
          handleEditApp(app);
        }}
        onDelete={removeApplication}
      />

      {/* Step-by-Step Interactive Tutorial Modal */}
      <TutorialModal
        isOpen={tutorialOpen}
        onClose={completeTutorial}
      />
    </div>
  );
}

export default App;
