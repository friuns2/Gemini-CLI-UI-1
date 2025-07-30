// Utility function for API calls (no authentication needed)
export const apiFetch = (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};

// API endpoints (all public now)
export const api = {
  // All endpoints
  config: () => apiFetch('/api/config'),
  projects: () => apiFetch('/api/projects'),
  sessions: (projectName, limit = 5, offset = 0) => 
    apiFetch(`/api/projects/${projectName}/sessions?limit=${limit}&offset=${offset}`),
  sessionMessages: (projectName, sessionId) =>
    apiFetch(`/api/projects/${projectName}/sessions/${sessionId}/messages`),
  renameProject: (projectName, displayName) =>
    apiFetch(`/api/projects/${projectName}/rename`, {
      method: 'PUT',
      body: JSON.stringify({ displayName }),
    }),
  deleteSession: (projectName, sessionId) =>
    apiFetch(`/api/projects/${projectName}/sessions/${sessionId}`, {
      method: 'DELETE',
    }),
  deleteProject: (projectName) =>
    apiFetch(`/api/projects/${projectName}`, {
      method: 'DELETE',
    }),
  createProject: (path) =>
    apiFetch('/api/projects/create', {
      method: 'POST',
      body: JSON.stringify({ path }),
    }),
  readFile: (projectName, filePath) =>
    apiFetch(`/api/projects/${projectName}/file?filePath=${encodeURIComponent(filePath)}`),
  saveFile: (projectName, filePath, content) =>
    apiFetch(`/api/projects/${projectName}/file`, {
      method: 'PUT',
      body: JSON.stringify({ filePath, content }),
    }),
  getFiles: (projectName) =>
    apiFetch(`/api/projects/${projectName}/files`),
  transcribe: (formData) =>
    apiFetch('/api/transcribe', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),
};