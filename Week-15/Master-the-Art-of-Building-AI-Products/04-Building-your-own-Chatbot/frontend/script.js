/**
 * DOM REFERENCES:
 * > Select required elements from the page:
 *   - textarea input
 *   - chat container
 *   - Ask button
 */
const input = document.querySelector('#input');
const chatContainer = document.querySelector('#chat-container');
const askBtn = document.querySelector('#ask');

/**
 * THREAD ID:
 * > Unique ID generated once per page load.
 * > Backend uses this to maintain conversation memory.
 */
const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);


/**
 * EVENT LISTENERS:
 * > Enter key triggers message
 * > Ask button click triggers message
 */
input?.addEventListener('keyup', handleEnter);
askBtn?.addEventListener('click', handleAsk);


/**
 * LOADING ELEMENT:
 * > Created once.
 * > Appended before server call.
 * > Removed after response.
 */
const loading = document.createElement('div');
loading.className = 'my-6 animate-pulse';
loading.textContent = 'Thinking...';


/**
 * GENERATE FUNCTION:
 * > Main chat logic:
 *   1. Append user message
 *   2. Show loading indicator
 *   3. Call backend (LLM)
 *   4. Append assistant response
 */
async function generate(text) {
    /* Step 1: Show user message */
    const msg = document.createElement('div');
    msg.className = `my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit`;
    msg.textContent = text;

    chatContainer?.appendChild(msg);
    input.value = '';

    /* Step 2: Show loading */
    chatContainer?.appendChild(loading);

    /* Step 3: Call backend */
    const assistantMessage = await callServer(text);

    /* Step 4: Create assistant message element */
    const assistantMsgElem = document.createElement('div');
    assistantMsgElem.className = `max-w-fit`;
    assistantMsgElem.textContent = assistantMessage;

    /* Remove loading and show response */
    loading.remove();
    chatContainer?.appendChild(assistantMsgElem);
}

/**
 * CALL SERVER:
 * > Sends POST request to backend.
 * > Backend calls LLM and returns response.
 */
async function callServer(inputText) {

    const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ threadId: threadId, message: inputText }),
    });

    if (!response.ok) {
        throw new Error('Error generating the response.');
    }

    const result = await response.json();
    return result.message;
}

/**
 * HANDLE ASK:
 * > Triggered when Ask button is clicked.
 */
async function handleAsk(e) {
    const text = input?.value.trim();
    if (!text) {
        return;
    }

    await generate(text);
}


/**
 * HANDLE ENTER KEY:
 * > If user presses Enter → send message
 */
async function handleEnter(e) {
    if (e.key === 'Enter') {
        const text = input?.value.trim();
        if (!text) {
            return;
        }

        await generate(text);
    }
}
