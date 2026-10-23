
/*
 * Escape the Evil AI - Project NEXUS
 * Mohammed: Endings, Input Handling and Replay
 */

// Run one complete adventure.
function playGame() {
    // Reset all progress at the beginning of each game.
    let hasKeycard = false;
    let hasCode = false;
    let nexusDown = false;
    let currentRoom = "laboratory";
    let gameOver = false;

    console.log("=== Escape the Evil AI: Project NEXUS ===");
    console.log("A new game has started.");

    while (!gameOver) {
        let choice;

        if (currentRoom === "laboratory") {
            console.log("Current room: Laboratory");

            choice = prompt(
                "LABORATORY\n" +
                "You wake up in a locked laboratory.\n\n" +
                "1. Search the desk\n" +
                "2. Go to the Security Room\n" +
                "3. Quit game\n\n" +
                "Enter 1, 2, or 3."
            );

            if (choice === null) {
                console.log("Game cancelled by the player.");
                alert("You cancelled the game. Goodbye!");
                return "cancelled";
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (!hasKeycard) {
                    hasKeycard = true;
                    alert("You found a keycard!");
                    console.log("Keycard collected.");
                } else {
                    alert("The desk is empty. You already have the keycard.");
                }
            } else if (choice === "2") {
                currentRoom = "security";
            } else if (choice === "3") {
                alert("You decided to quit the adventure.");
                console.log("The player quit the game.");
                gameOver = true;
            } else {
                alert("Invalid choice. Enter 1, 2, or 3.");
            }

        } else if (currentRoom === "security") {
            console.log("Current room: Security Room");

            choice = prompt(
                "SECURITY ROOM\n" +
                "Screens monitor the entire facility.\n\n" +
                "1. Search the computer\n" +
                "2. Go to the Server Room\n" +
                "3. Return to the Laboratory\n\n" +
                "Enter 1, 2, or 3."
            );

            if (choice === null) {
                console.log("Game cancelled by the player.");
                alert("You cancelled the game. Goodbye!");
                return "cancelled";
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (!hasCode) {
                    hasCode = true;
                    alert("You discovered the server shutdown code!");
                    console.log("Shutdown code discovered.");
                } else {
                    alert("You already know the shutdown code.");
                }
            } else if (choice === "2") {
                currentRoom = "server";
            } else if (choice === "3") {
                currentRoom = "laboratory";
            } else {
                alert("Invalid choice. Enter 1, 2, or 3.");
            }

        } else if (currentRoom === "server") {
            console.log("Current room: Server Room");

            choice = prompt(
                "SERVER ROOM\n" +
                "NEXUS controls the facility from here.\n\n" +
                "1. Shut down NEXUS\n" +
                "2. Return to the Security Room\n" +
                "3. Go to the Exit Gate\n\n" +
                "Enter 1, 2, or 3."
            );

            if (choice === null) {
                console.log("Game cancelled by the player.");
                alert("You cancelled the game. Goodbye!");
                return "cancelled";
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (nexusDown) {
                    alert("NEXUS is already offline.");
                } else if (hasCode) {
                    nexusDown = true;
                    alert("You enter the code and shut down NEXUS!");
                    console.log("NEXUS has been shut down.");
                } else {
                    alert("You need the shutdown code first!");
                }
            } else if (choice === "2") {
                currentRoom = "security";
            } else if (choice === "3") {
                currentRoom = "exit";
            } else {
                alert("Invalid choice. Enter 1, 2, or 3.");
            }

        } else if (currentRoom === "exit") {
            console.log("Current room: Exit Gate");

            choice = prompt(
                "EXIT GATE\n" +
                "The final door stands before you.\n\n" +
                "1. Attempt to escape\n" +
                "2. Return to the Server Room\n\n" +
                "Enter 1 or 2."
            );

            if (choice === null) {
                console.log("Game cancelled by the player.");
                alert("You cancelled the game. Goodbye!");
                return "cancelled";
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (hasKeycard && nexusDown) {
                    alert(
                        "SUCCESS! You escaped the facility!\n" +
                        "You defeated NEXUS. Congratulations!"
                    );
                    console.log("ENDING: SUCCESSFUL ESCAPE.");
                } else if (hasKeycard) {
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

                gameOver = true;

            } else if (choice === "2") {
                currentRoom = "server";
            } else {
                alert("Invalid choice. Enter 1 or 2.");
            }
        }
    }

    return "ended";
}

// Display instructions before starting the adventure.
function startGame() {
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

    // Allow the player to replay without recursive function calls.
    while (true) {
        const result = playGame();

        // Cancel ends the game immediately and safely.
        if (result === "cancelled") {
            return;
        }

        const playAgain = confirm(
            "The adventure has ended.\n\n" +
            "Would you like to play again?\n" +
            "Your progress will be reset."
        );

        if (!playAgain) {
            alert("Thanks for playing Escape the Evil AI!");
            console.log("Thanks for playing. Game closed.");
            break;
        }

        console.log("Restarting with fresh progress.");
    }
}

// Start the game when the JavaScript file loads.
startGame();
