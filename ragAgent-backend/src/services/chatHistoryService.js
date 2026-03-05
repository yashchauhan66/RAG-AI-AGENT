const chatHistory = new Map();

function addMessage(sessionId, role, content) {

  if (!chatHistory.has(sessionId)) {
    chatHistory.set(sessionId, []);
  }

  const history = chatHistory.get(sessionId);

  history.push({
    role,
    content,
    timestamp: new Date()
  });

  if (history.length > 20) {
    history.shift();
  }
}

function getHistory(sessionId) {

  return chatHistory.get(sessionId) || [];

}

function clearHistory(sessionId) {

  chatHistory.delete(sessionId);

}

export { addMessage, getHistory, clearHistory };