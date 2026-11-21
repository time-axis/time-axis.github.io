// HOTKEY SETTINGS — This file is yours to keep between Web Editor updates.
// Keep hotkeys.js next to the editor HTML file, and edit only the values below.
// Example: '#saveDatabaseButton': 'F2', or '' to disable a shortcut.
// Use 'Enter' for Return, 'Escape', 'ArrowUp', letters, digits, etc.
// S = Get Illustrator; D = Next Missing. All other shortcuts are unassigned.
// Every shortcut requires Enable Hotkeys and a visible, enabled button.
// Shortcuts do not activate while typing in an input, textarea, dropdown,
// or contenteditable field; Ctrl/Alt/Command combinations are ignored.
// In a repeated-button selector, the first visible button is activated.

const BUTTON_HOTKEYS = {
    // Search & main database
    '#toggleAdvanced': '',
    '#clearSearch': '',
    '#manualLoadBtn': '',
    '#saveDatabaseButton': '',
    '#deleteSelectedButton': '',
    // Right-hand card actions
    '#enterEditMode': '',
    '#newCardMode': '',
    '#addSelectedToDeck': 'd',
    '#addSelectedToSet': 's',
    '#addSelectedToCollection': 'c',
    '#insertDraftAfter': '',
    '#insertDraftEnd': '',
    '#saveInlineEdit': 'Enter',
    '#previewDraftCard': '',
    '#toggleDraftJSON': '',
    '#cancelInlineEdit': '',
    '#sidePanelButton': '',
    '#getIllustratorButton': '',
    '#nextMissingIllustrator': '',
    // Workspace tabs
    '#openParserTab': '',
    '#openDeckTab': '',
    '#openSetTab': '',
    '#openBoosterTab': '',
    '#openCollectionTab': '',
    // Card Data Parser
    '#editJSONSelected': '',
    '#insertJSONAfter': '',
    '#insertJSONEnd': '',
    '#displayParsedCard': '',
    '#convertCardText': '',
    '#convertInsertAfter': '',
    '#convertInsertEnd': '',
    // Deck Builder
    '#importDeck': '',
    '#clearDeck': '',
    '#generateDeckText': '',
    '#copyDeckText': '',
    '#downloadDeckText': '',
    // Set Editor
    '#importSet': '',
    '#clearSet': '',
    '#downloadSetJSON': '',
    // Dynamically created buttons (first visible match only)
    '#cardTable button.edit-add': '',
    '#cardTable button.edit-remove': '',
    '#deckEntries button[title^="Add one"]': '',
    '#deckEntries button[title^="Remove one"]': '',
    '#setEntries button.set-rarity-button': '',
    '#setEntries button.collection-remove': '',
    '#setEntries button.collection-handle': ''
};

function findVisibleHotkeyButton(key) {
    for (const [selector, assigned] of Object.entries(BUTTON_HOTKEYS)) {
        if (!assigned || assigned.trim().toLowerCase() !== key.toLowerCase()) continue;
        for (const button of document.querySelectorAll(selector)) {
            if (button.tagName !== 'BUTTON' || button.disabled || !button.isConnected ||
                button.closest('[hidden], [inert]') || !button.getClientRects().length ||
                getComputedStyle(button).visibility !== 'visible') continue;
            return button;
        }
    }
    return null;
}

// Handle configured shortcuts here, separately from editor's arrow navigation.
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('illustratorHotkeysEnabled')?.checked) return;
    const active = document.activeElement;
    const isTyping = active && (active.matches('textarea, select') ||
        (active.matches('input') && !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(active.type)) ||
        active.isContentEditable);
    if (isTyping || e.ctrlKey || e.altKey || e.metaKey || e.repeat || e.defaultPrevented) return;
    const button = findVisibleHotkeyButton(e.key);
    if (button) {
        e.preventDefault();
        button.click();
    }
});
