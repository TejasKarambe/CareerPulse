import { openDB } from 'idb';

const DB_NAME = 'CareerPulse_JobTracker_DB';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('applications')) {
        const appStore = db.createObjectStore('applications', { keyPath: 'id' });
        appStore.createIndex('status', 'status', { unique: false });
        appStore.createIndex('companyName', 'companyName', { unique: false });
        appStore.createIndex('appliedDate', 'appliedDate', { unique: false });
      }

      if (!db.objectStoreNames.contains('notes')) {
        const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
        notesStore.createIndex('applicationId', 'applicationId', { unique: false });
      }
    },
  });
}

// Applications CRUD
export async function getAllApplications() {
  const db = await initDB();
  const apps = await db.getAll('applications');
  return apps || [];
}

export async function saveApplication(app) {
  const db = await initDB();
  const applicationToSave = {
    ...app,
    lastUpdated: new Date().toISOString(),
  };
  await db.put('applications', applicationToSave);
  return applicationToSave;
}

export async function deleteApplication(id) {
  const db = await initDB();
  await db.delete('applications', id);
  return id;
}

export async function bulkInsertApplications(apps) {
  const db = await initDB();
  const tx = db.transaction('applications', 'readwrite');
  for (const app of apps) {
    await tx.store.put(app);
  }
  await tx.done;
}

export async function clearAllApplications() {
  const db = await initDB();
  const tx = db.transaction('applications', 'readwrite');
  await tx.store.clear();
  await tx.done;
}
