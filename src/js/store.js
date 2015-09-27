let currentState = {};

export function getState() {
    return { ...currentState };
}

export function updateState(branch, patch) {
    if ("." === branch) {
        currentState = { ...currentState, ...patch };
    } else {
        currentState = { ...currentState, [branch]: { ...currentState[branch], ...patch } };
    }

    return true;
}
