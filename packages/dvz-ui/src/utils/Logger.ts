
const NO_OP = () => { };

export const setupConsoleToggle = () => {
    if (typeof window === "undefined") return;

    // Prevent double initialization
    if ((window as any).toggleLogs) return;

    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        debug: console.debug, // Added debug
    };

    let logsEnabled = true;

    // Check localStorage for persisted preference (optional but useful)
    try {
        const saved = localStorage.getItem("dvz_logs_enabled");
        if (saved === "false") {
            logsEnabled = false;
        }
    } catch (e) {
        // ignore
    }

    const setConsoleState = (enabled: boolean) => {
        if (enabled) {
            console.log = originalConsole.log;
            console.warn = originalConsole.warn;
            console.error = originalConsole.error;
            console.info = originalConsole.info;
            console.debug = originalConsole.debug;
        } else {
            console.log = NO_OP;
            console.warn = NO_OP;
            console.error = NO_OP; // Consider if we want to hide errors too. Usually yes if "global off".
            console.info = NO_OP;
            console.debug = NO_OP;
        }
        logsEnabled = enabled;
        try {
            localStorage.setItem("dvz_logs_enabled", String(enabled));
        } catch (e) { }

        // Use original log to confirm status to user even if disabled (optional, but helpful to know it worked)
        originalConsole.log(
            `%c[Logger] Logs are now ${enabled ? "ENABLED" : "DISABLED"}`,
            "background: #222; color: #bada55"
        );
    };

    // Apply initial state
    setConsoleState(logsEnabled);

    // Expose to window
    (window as any).toggleLogs = (enable?: boolean) => {
        if (enable === undefined) {
            setConsoleState(!logsEnabled);
        } else {
            setConsoleState(!!enable);
        }
    };

    (window as any).areLogsEnabled = () => logsEnabled;

    console.log("%c[Logger] Global log toggle initialized. Use window.toggleLogs(true/false) to control.", "color: gray");
};
