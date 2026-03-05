const memoryStore = new Map();

export const getChatHistory = (sessionId) => {

  if (!memoryStore.has(sessionId)) {
    memoryStore.set(sessionId, []);
  }

  return memoryStore.get(sessionId);

};

export const addMessage = (sessionId, role, content) => {

  const history = getChatHistory(sessionId);

  history.push({
    role,
    content
  });

};