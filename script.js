// BOOT SEQUENCE
window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot-screen');
    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            startTypewriter(); // Start typing once boot is done
        }, 500);
    }, 3000); // 3 seconds boot time
});

// SYSTEM TELEMETRY (Dynamic Info)
const sysOs = document.getElementById('sys-os');
const sysRes = document.getElementById('sys-res');
const pingVal = document.getElementById('ping-val');

function getOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") != -1) return "WINDOWS_NT";
    if (userAgent.indexOf("Mac") != -1) return "MAC_OSX";
    if (userAgent.indexOf("Linux") != -1) return "LINUX_KERNEL";
    return "UNKNOWN_OS";
}

sysOs.textContent = getOS();
sysRes.textContent = `${window.screen.width}x${window.screen.height}`;

// Simulate network ping fluctuation
setInterval(() => {
    const randomPing = Math.floor(Math.random() * 20) + 5; // 5-25ms
    pingVal.textContent = `${randomPing}ms`;
}, 2000);

// PARALLAX GRID EFFECT
const gridBg = document.getElementById('grid-bg');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    gridBg.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
});

// TYPEWRITER EFFECT
function startTypewriter() {
    const typeTarget = document.getElementById('typewriter');
    const textToType = "$ whoami // user profile loaded";
    typeTarget.textContent = "";
    let i = 0;
    
    function type() {
        if (i < textToType.length) {
            typeTarget.textContent += textToType.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// MODULE NAVIGATION SYSTEM
const viewModules = document.querySelectorAll(".view-module");
const navDeck = document.getElementById("navigation");
const menuToggle = document.getElementById("menu-toggle");

function switchModule(moduleId, updateHistory = true) {
    const targetModule = document.getElementById(moduleId);

    if (!targetModule || !targetModule.classList.contains("view-module")) {
        return;
    }

    viewModules.forEach(module => {
        module.classList.toggle("active", module === targetModule);
    });

    document.querySelectorAll("[data-open]").forEach(trigger => {
        trigger.classList.toggle("active", trigger.dataset.open === moduleId);
    });

    document.getElementById("screen-title").textContent = targetModule.dataset.title;
    document.getElementById("screen-number").textContent = `SCREEN ${targetModule.dataset.number} / 08`;

    navDeck.classList.remove("open");
    menuToggle.textContent = "☰";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (updateHistory && location.hash !== `#${moduleId}`) {
        history.pushState({ page: moduleId }, "", `#${moduleId}`);
    }
}

document.querySelectorAll("[data-open]").forEach(trigger => {
    trigger.addEventListener("click", () => {
        switchModule(trigger.dataset.open);
    });
});

window.addEventListener("popstate", () => {
    const moduleId = location.hash.slice(1) || "home";
    switchModule(moduleId, false);
});

const initialModule = location.hash.slice(1);
switchModule(
    document.getElementById(initialModule) ? initialModule : "home",
    false
);

// MOBILE NAVIGATION TOGGLE
menuToggle.addEventListener("click", () => {
    const isDeckOpen = navDeck.classList.toggle("open");
    menuToggle.textContent = isDeckOpen ? "✕" : "☰";
});

// LIVE DIGITAL CLOCK
const clockDisplay = document.getElementById("clock");

function refreshClock() {
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString();
}

refreshClock();
setInterval(refreshClock, 1000);

// THEME SWITCHER (DARK / LIGHT)
const themeToggle = document.getElementById("theme");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLightMode ? "☾" : "☼";
});

// INTERACTIVE NETWORK LAB
const nodeDatabase = {
    router: [
        "⌁",
        "Router",
        "NETWORK DEVICE / 01",
        "A router connects different networks and directs data packets toward their destination.",
        "Connects networks and forwards data between them.",
        "DEVICE 01 / 04"
    ],
    switch: [
        "▦",
        "Network Switch",
        "NETWORK DEVICE / 02",
        "A switch connects devices within the same local area network (LAN).",
        "Connects devices in a LAN and forwards frames using MAC addresses.",
        "DEVICE 02 / 04"
    ],
    server: [
        "▣",
        "Server",
        "NETWORK DEVICE / 03",
        "A server provides services or resources to other computers across a network.",
        "Provides services such as DHCP, file storage, and web hosting.",
        "DEVICE 03 / 04"
    ],
    pc: [
        "▱",
        "PC Client",
        "END DEVICE / 04",
        "A client computer uses network services and communicates with other devices.",
        "Sends and receives data and requests services from servers.",
        "DEVICE 04 / 04"
    ]
};

document.querySelectorAll(".node-router, .node-switch, .node-server, .node-pc").forEach(node => {
    node.addEventListener("click", () => {
        const nodeInfo = nodeDatabase[node.dataset.device];
        if (!nodeInfo) return;

        document.querySelectorAll(".node-router, .node-switch, .node-server, .node-pc").forEach(btn => {
            btn.classList.toggle("selected", btn === node);
        });

        document.getElementById("device-icon").textContent = nodeInfo[0];
        document.getElementById("device-title").textContent = nodeInfo[1];
        document.getElementById("device-category").textContent = nodeInfo[2];
        document.getElementById("device-description").textContent = nodeInfo[3];
        document.getElementById("device-function").textContent = nodeInfo[4];
        document.getElementById("device-counter").textContent = nodeInfo[5];
    });
});

// COPY EMAIL TO CLIPBOARD
document.getElementById("copy-email").addEventListener("click", async () => {
    const emailAnchor = document.getElementById("email-link");
    const emailAddress = emailAnchor.href.replace("mailto:", "");
    const feedbackMessage = document.getElementById("copy-message");

    if (emailAddress === "your-email@example.com") {
        feedbackMessage.textContent = "Please add your real email address first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(emailAddress);
        feedbackMessage.textContent = "Email address copied!";
    } catch {
        feedbackMessage.textContent = "Please use the email link instead.";
    }
});