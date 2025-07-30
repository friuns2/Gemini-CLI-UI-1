import { spawnGemini } from './server/gemini-cli.js';

async function runCommand() {
  try {
    console.log('Running a simple Gemini command...');
    // In a real scenario, ws (websocket) would be passed from a client connection.
    // For this example, we're passing a mock object.
    const mockWs = {
      send: (message) => {
        const data = JSON.parse(message);
        if (data.type === 'gemini-response') {
          console.log('Gemini Response:', data.data.content);
        } else if (data.type === 'gemini-error') {
          console.error('Gemini Error:', data.error);
        } else {
          // console.log('WebSocket message:', data);
        }
      }
    };
    
    await spawnGemini('Hello Gemini, what can you do?', {}, mockWs);
    console.log('Gemini command finished.');
  } catch (error) {
    console.error('Error running Gemini command:', error);
  }
}

runCommand(); 