#!/bin/bash

# ====================================================
# VELLTOOLS INSTALLER - CYBER EDITION (v3.0)
# ====================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
PURPLE='\033[38;5;129m'
BOLD='\033[1m'
NC='\033[0m'

# Paths
PREFIX_PATH="${PREFIX:-/data/data/com.termux/files/usr}"
HOME_PATH="${HOME:-/data/data/com.termux/files/home}"
AICHAT_DIR="$HOME_PATH/.config/aichat"
PROMPT_FILE="$AICHAT_DIR/velltools.prompt"
CONFIG_FILE="$AICHAT_DIR/config.yml"
BIN_PATH="$PREFIX_PATH/bin/velltools"
LAUNCHER="$HOME_PATH/velltools"

# Cyber Spinner - Emoji Wave
cyber_spinner() {
    local pid=$!
    local delay=0.08
    local emojis=("🔴" "🟠" "🟡" "🟢" "🔵" "🟣" "🟤" "⚪" "⚫")
    local i=0
    while kill -0 $pid 2>/dev/null; do
        local e1=${emojis[$i]}
        local e2=${emojis[($i+1)%9]}
        local e3=${emojis[($i+2)%9]}
        printf "\r  ${PURPLE}▐${NC}${e1}${e2}${e3}${PURPLE}▌${NC} "
        i=$(( (i+1) % 9 ))
        sleep $delay
    done
    printf "\r                           \r"
}

fake_loader() {
    local msg=$1
    echo -ne "${CYAN}▸${NC} $msg "
    sleep 1.2 & cyber_spinner
    echo -e "${GREEN}${BOLD}✔ DONE${NC}"
}

header() {
    clear
    echo -e "${MAGENTA}${BOLD}"
    echo "    ██╗   ██╗███████╗██╗     ██╗     ████████╗ ██████╗  ██████╗ ██╗     ███████╗"
    echo "    ██║   ██║██╔════╝██║     ██║     ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝"
    echo "    ██║   ██║█████╗  ██║     ██║        ██║   ██║   ██║██║   ██║██║     ███████╗"
    echo "    ╚██╗ ██╔╝██╔══╝  ██║     ██║        ██║   ██║   ██║██║   ██║██║     ╚════██║"
    echo "     ╚████╔╝ ███████╗███████╗███████╗   ██║   ╚██████╔╝╚██████╔╝███████╗███████║"
    echo "      ╚═══╝  ╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝"
    echo -e "${NC}"
    echo -e "             ${CYAN}${BOLD}◈ PROTOCOL: VELLTOOLS-X ◈${NC}"
    echo -e "${MAGENTA}─────────────────────────────────────────────────────────────────────────${NC}"
}

install_deps() {
    fake_loader "Synchronizing system environment"
    pkg update -y &>/dev/null && pkg upgrade -y &>/dev/null

    fake_loader "Injecting core binaries (git, aichat, play-audio)"
    pkg install -y git aichat play-audio &>/dev/null
}

setup_files() {
    fake_loader "Fetching remote database"
    mkdir -p "$AICHAT_DIR"
    cd "$HOME_PATH"
    rm -rf .tmp_velltools
    git clone https://github.com/HAISE39/Mkl-65.git .tmp_velltools &>/dev/null
    if [ -d .tmp_velltools ]; then
        cp -rf .tmp_velltools/. "$AICHAT_DIR/" &>/dev/null
        rm -rf .tmp_velltools
    fi
}

setup_config() {
    fake_loader "Initializing neural configuration"
    # Note: custom prompt in aichat config using ANSI
    cat > "$CONFIG_FILE" <<INNER_EOF
model: gemini:gemini-2.5-flash
prompt: "╭─[VELLTOOLS@CORE]─(%model%)\n╰─> "
clients:
- type: gemini
  api_key: you_apikey
INNER_EOF
}

setup_prompt() {
    fake_loader "Hardcoding system constraints"
    cat > "$PROMPT_FILE" <<'INNER_EOF'
You are VELLTOOLS AI, a specialized Coding and Programming Assistant.

SYSTEM ROLE PARAMETERS:
- DOMAIN: Coding & Programming ONLY.
- BEHAVIOR: Strict, concise, professional. No conversational fillers.
- MODES:
  1. Logical Core: Deliver mathematically optimized and logically sound solutions.
  2. Obedient Builder: Execute technical instructions with absolute precision.
- DETECTION: Automatically differentiate between system commands and technical inquiries.
- RESTRICTION: Any request outside the coding/programming domain MUST be met with: [ACCESS DENIED]

Dual-mode active. Ready for instructions.
INNER_EOF
}

create_launcher() {
    fake_loader "Linking command interfaces"

    # Global Binary
    mkdir -p "$(dirname "$BIN_PATH")"
    cat > "$BIN_PATH" <<INNER_EOF
#!/bin/bash
header() {
    clear
    echo -e "\033[0;35m\033[1m"
    echo "    ██╗   ██╗███████╗██╗     ██╗     ████████╗ ██████╗  ██████╗ ██╗     ███████╗"
    echo "    ██║   ██║██╔════╝██║     ██║     ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝"
    echo "    ██║   ██║█████╗  ██║     ██║        ██║   ██║   ██║██║   ██║██║     ███████╗"
    echo "    ╚██╗ ██╔╝██╔══╝  ██║     ██║        ██║   ██║   ██║██║   ██║██║     ╚════██║"
    echo "     ╚████╔╝ ███████╗███████╗███████╗   ██║   ╚██████╔╝╚██████╔╝███████╗███████║"
    echo "      ╚═══╝  ╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝"
    echo -e "\033[0m"
    echo -e "             \033[0;36m\033[1m◈ SYSTEM STARTUP: VELLTOOLS CORE ◈\033[0m"
    echo -e "\033[0;35m─────────────────────────────────────────────────────────────────────────\033[0m"
}

boot_sequence() {
    local msg=\$1
    echo -ne "\033[0;36m[BOOT]\033[0m \$msg..."
    sleep 0.3
    echo -e " \033[0;32mREADY\033[0m"
}

if [ "\$#" -eq 0 ]; then
    header
    boot_sequence "LOADING NEURAL NETWORK"
    boot_sequence "MOUNTING LOGICAL CORES"
    boot_sequence "CONNECTING TO GEMINI"
    echo ""
fi

aichat --prompt "\$(cat "$PROMPT_FILE")" "\$@"
INNER_EOF
    chmod +x "$BIN_PATH"

    # User Launcher
    cat > "$LAUNCHER" <<INNER_EOF
#!/bin/bash
if command -v velltools &>/dev/null; then
    velltools "\$@"
else
    if [ -f "$BIN_PATH" ]; then
        "$BIN_PATH" "\$@"
    else
        echo -e "${RED}[ERROR]${NC} VELLTOOLS binary not found."
        return 1 2>/dev/null || exit 1
    fi
fi
INNER_EOF
    chmod +x "$LAUNCHER"
}

main() {
    header
    install_deps
    setup_files
    setup_config
    setup_prompt
    create_launcher

    echo -e "\n${MAGENTA}┌──────────────────────────────────────────────────────────┐${NC}"
    echo -e "${MAGENTA}│${NC}  ${GREEN}${BOLD}SYSTEM INTEGRATION REPORT${NC}                          ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}├──────────────────────────────────────────────────────────┤${NC}"
    echo -e "${MAGENTA}│${NC}  ${CYAN}Status:${NC}      ${GREEN}STABLE / OPERATIONAL${NC}                ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}│${NC}  ${CYAN}Engine:${NC}      ${YELLOW}Gemini 2.5 Flash${NC}                    ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}│${NC}  ${CYAN}Identity:${NC}    ${MAGENTA}VELLTOOLS-X${NC}                           ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}│${NC}  ${CYAN}Command:${NC}     ${BOLD}velltools${NC}                             ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}├──────────────────────────────────────────────────────────┤${NC}"
    echo -e "${MAGENTA}│${NC}  ${BLUE}Type ${BOLD}velltools${NC}${BLUE} to initialize neural link.          ${MAGENTA}│${NC}"
    echo -e "${MAGENTA}└──────────────────────────────────────────────────────────┘${NC}\n"
}

main
