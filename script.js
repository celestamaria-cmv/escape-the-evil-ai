function createGameState() {
    return {
        hasKeycard: false,
        hasCode: false,
        nexusDown: false,
        currentRoom: "laboratory",
        gameOver: false
    };
}

function showRoom(state) {
    const rooms = {
        laboratory: {
            name: "Laboratory",
            description: "You wake up in a locked laboratory.",
            options: [
                "1. Search the desk",
                "2. Go to the Security Room",
                "3. Quit game"
            ]
        },
        security: {
            name: "Security Room",
            description: "Screens monitor the entire facility.",
            options: [
                "1. Search the computer",
                "2. Go to the Server Room",
                "3. Return to the Laboratory"
            ]
        },
        server: {
            name: "Server Room",
            description: "NEXUS controls the facility from here.",
            options: [
                "1. Shut down NEXUS",
                "2. Return to the Security Room",
                "3. Go to the Exit Gate"
            ]
        },
        exit: {
            name: "Exit Gate",
            description: "The final door stands before you.",
            options: [
                "1. Attempt to escape",
                "2. Return to the Server Room"
            ]
        }
    };

    const room = rooms[state.currentRoom];

    console.log("Current room: " + room.name);

    return prompt(
        room.name.toUpperCase() + "\n" +
        room.description + "\n\n" +
        room.options.join("\n") +
        "\n\nEnter your choice."
    );
}

function getPlayerChoice() {
    const choice = prompt("Enter your choice:");

    if (choice === null) {
        return null;
    }

    return choice.trim().toLowerCase();
}

function invalidChoice() {
    alert("Invalid choice. Please try again.");
}

function changeRoom(state, room) {
    state.currentRoom = room;
}

function handleLaboratory(state, choice) {
    if (choice === "1") {
        if (!state.hasKeycard) {
            state.hasKeycard = true;
            alert("You found a keycard!");
            console.log("Keycard collected.");
        } else {
            alert("The desk is empty. You already have the keycard.");
        }
    } else if (choice === "2") {
        changeRoom(state, "security");
    } else if (choice === "3") {
        alert("You decided to quit the adventure.");
        console.log("The player quit the game.");
        state.gameOver = true;
    } else {
        invalidChoice();
    }
}

function handleSecurity(state, choice) {
    if (choice === "1") {
        if (!state.hasCode) {
            state.hasCode = true;
            alert("You discovered the server shutdown code!");
            console.log("Shutdown code discovered.");
        } else {
            alert("You already know the shutdown code.");
        }
    } else if (choice === "2") {
        changeRoom(state, "server");
    } else if (choice === "3") {
        changeRoom(state, "laboratory");
    } else {
        invalidChoice();
    }
}

function handleServer(state, choice) {
    if (choice === "1") {
        if (state.nexusDown) {
            alert("NEXUS is already offline.");
        } else if (state.hasCode) {
            state.nexusDown = true;
            alert("You enter the code and shut down NEXUS!");
            console.log("NEXUS has been shut down.");
        } else {
            alert("You need the shutdown code first!");
        }
    } else if (choice === "2") {
        changeRoom(state, "security");
    } else if (choice === "3") {
        changeRoom(state, "exit");
    } else {
        invalidChoice();
    }
}

function handleExit(state, choice) {
    if (choice === "1") {
        if (state.hasKeycard && state.nexusDown) {
            alert(
                "SUCCESS! You escaped the facility!\n" +
                "You defeated NEXUS. Congratulations!"
            );
            console.log("ENDING: SUCCESSFUL ESCAPE.");
        } else if (state.hasKeycard) {
            alert(
                "NEXUS is still online and seals the gate!\n\n" +
                "GAME OVER! You could not escape."
            );
            console.log("ENDING: FAILURE - NEXUS IS STILL ONLINE.");
        } else {
            alert(
                "You do not have the keycard!\n\n" +
                "GAME OVER! NEXUS catches you."
            );
            console.log("ENDING: FAILURE - KEYCARD MISSING.");
        }

        state.gameOver = true;

    } else if (choice === "2") {
        changeRoom(state, "server");
    } else {
        invalidChoice();
    }
}

function handleChoice(state, choice) {
    const roomHandlers = {
        laboratory: handleLaboratory,
        security: handleSecurity,
        server: handleServer,
        exit: handleExit
    };

    roomHandlers[state.currentRoom](state, choice);
}

function playGame() {
    const state = createGameState();

    console.log("=== Escape the Evil AI: Project NEXUS ===");
    console.log("A new game has started.");

    while (!state.gameOver) {
        const choice = showRoom(state);

        if (choice === null) {
            console.log("Game cancelled by the player.");
            alert("You cancelled the game. Goodbye!");
            return "cancelled";
        }

        handleChoice(state, choice.trim().toLowerCase());
    }

    return "ended";
}

function showInstructions() {
    alert(
        "WELCOME TO ESCAPE THE EVIL AI!\n\n" +
        "Your mission: collect the keycard, find the shutdown code, " +
        "turn off NEXUS, and escape.\n\n" +
        "HOW TO PLAY:\n" +
        "- Enter the number of your chosen action in each prompt.\n" +
        "- You can return to rooms you have already visited.\n" +
        "- Invalid choices will not change your progress.\n" +
        "- Press Cancel in a prompt to end the game safely.\n\n" +
        "CONSOLE INSTRUCTIONS:\n" +
        "The game uses browser dialogs for your choices and the " +
        "console to show room changes, collected items, and endings.\n\n" +
        "In Chrome or Edge on Windows, press F12 or Ctrl + Shift + J " +
        "to open Developer Tools, then select Console.\n\n" +
        "These instructions are also available before you start playing."
    );
}

function askToPlayAgain() {
    return confirm(
        "The adventure has ended.\n\n" +
        "Would you like to play again?\n" +
        "Your progress will be reset."
    );
}

function startGame() {
    showInstructions();

    while (true) {
        const result = playGame();

        if (result === "cancelled") {
            return;
        }

        if (!askToPlayAgain()) {
            alert("Thanks for playing Escape the Evil AI!");
            console.log("Thanks for playing. Game closed.");
            break;
        }

        console.log("Restarting with fresh progress.");
    }
}

startGame();