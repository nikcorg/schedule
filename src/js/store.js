let currentState = {};

let globalListeners = [];
let branchListeners = {};

let notify = callback => {
    try {
        callback(getState);
    } catch (e) {}
};

export function onUpdate(branch, callback) {
    if (null == callback && "function" == typeof branch) {
        // The callback is passed in branch for global listeners
        globalListeners.push(branch);
    }

    if (!branchListeners.hasOwnProperty("branch")) {
        branchListeners[branch] = [];
    }

    branchListeners[branch].push(callback);
}

export function getState() {
    return { ...currentState };
}

export function updateState(branch, patch) {
    if ("." === branch) {
        currentState = { ...currentState, ...patch };
    } else {
        currentState = { ...currentState, [branch]: { ...currentState[branch], ...patch } };
    }

    if (branchListeners.hasOwnProperty(branch)) {
        branchListeners[branch].forEach(notify);
    }

    globalListeners.forEach(notify);

    return true;
}
