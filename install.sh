#!/bin/bash

# ====================================================
# VELLTOOLS INSTALLER - PROFESSIONAL EDITION
# ====================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

# Paths (Termux defaults)
PREFIX_PATH="${PREFIX:-/data/data/com.termux/files/usr}"
HOME_PATH="${HOME:-/data/data/com.termux/files/home}"
AICHAT_DIR="$HOME_PATH/.config/aichat"
PROMPT_FILE="$AICHAT_DIR/velltools.prompt"
CONFIG_FILE="$AICHAT_DIR/config.yml"
BIN_PATH="$PREFIX_PATH/bin/velltools"
LAUNCHER="$HOME_PATH/velltools"

# UI components
spinner() {
    local pid=$!
    local delay=0.1
    local spinstr='|/-\'
    while kill -0 $pid 2>/dev/null; do
        local temp=${spinstr#?}
        printf " [${CYAN}%c${NC}]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

fake_loader() {
    local msg=$1
    echo -ne "${BLUE}➜${NC} $msg "
    sleep 1 & spinner
    echo -e "${GREEN}✓ DONE${NC}"
}

header() {
    clear
    echo -e "${CYAN}${BOLD}"
    echo "  __      ________ _      _      _______ ____   ____  _       _____ "
    echo "  \ \    / /  ____| |    | |    |__   __/ __ \ / __ \| |     / ____|"
    echo "   \ \  / /| |__  | |    | |       | | | |  | | |  | | |    | (___  "
    echo "    \ \/ / |  __| | |    | |       | | | |  | | |  | | |     \___ \ "
    echo "     \  /  | |____| |____| |____   | | | |__| | |__| | |____ ____) |"
    echo "      \/   |______|______|______|  |_|  \____/ \____/|______|_____/ "
    echo -e "${NC}"
    echo -e "         ${YELLOW}${BOLD}AI ENGINEER SYSTEM - TERMUX EDITION${NC}"
    echo -e "${BLUE}============================================================${NC}"
}

install_deps() {
    fake_loader "Initializing system repositories"
    pkg update -y &>/dev/null && pkg upgrade -y &>/dev/null

    fake_loader "Installing core resources (git, aichat, play-audio)"
    pkg install -y git aichat play-audio &>/dev/null
}

setup_files() {
    fake_loader "Synchronizing remote resources"
    mkdir -p "$AICHAT_DIR"
    cd "$HOME_PATH"
    git clone https://github.com/HAISE39/Mkl-65.git .tmp_velltools &>/dev/null
    if [ -d .tmp_velltools ]; then
        cp -rf .tmp_velltools/. "$AICHAT_DIR/" &>/dev/null
        rm -rf .tmp_velltools
    fi
}

setup_config() {
    fake_loader "Building AI configuration"
    cat > "$CONFIG_FILE" <<INNER_EOF
model: gemini:gemini-2.5-flash
clients:
- type: gemini
  api_key: you_apikey
INNER_EOF
}

setup_prompt() {
    fake_loader "Injecting logical core instructions"
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
    fake_loader "Finalizing binary links"

    # Global Binary
    mkdir -p "$(dirname "$BIN_PATH")"
    cat > "$BIN_PATH" <<INNER_EOF
#!/bin/bash
header() {
    echo -e "${CYAN}${BOLD}"
    echo "  __      ________ _      _      _______ ____   ____  _       _____ "
    echo "  \ \    / /  ____| |    | |    |__   __/ __ \ / __ \| |     / ____|"
    echo "   \ \  / /| |__  | |    | |       | | | |  | | |  | | |    | (___  "
    echo "    \ \/ / |  __| | |    | |       | | | |  | | |  | | |     \___ \ "
    echo "     \  /  | |____| |____| |____   | | | |__| | |__| | |____ ____) |"
    echo "      \/   |______|______|______|  |_|  \____/ \____/|______|_____/ "
    echo -e "${NC}"
}
if [ "\$#" -eq 0 ]; then
    header
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
        echo -e "${RED}[ERROR]${NC} VELLTOOLS binary not found. Please re-run installer."
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

    echo -e "\n${GREEN}${BOLD}✓ VELLTOOLS INSTALLED SUCCESSFULLY${NC}"
    echo -e "${CYAN}➜ COMMAND: ${BOLD}velltools${NC}"
    echo -e "${CYAN}➜ LAUNCHER: ${BOLD}./velltools${NC}\n"
}

main
