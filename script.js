// Escape the Evil AI - Project NEXUS

function startGame() {
    alert("Welcome to Escape the Evil AI!");
    alert("You are trapped in a research facility controlled by NEXUS.");
    alert("Explore the rooms, collect clues, and find a way to escape!");

    let hasKeycard = false;
    let hasCode = false;
    let nexusDown = false;
    let currentRoom = "laboratory";
    let gameOver = false;

    while (!gameOver) {
        let choice;

        if (currentRoom === "laboratory") {
            choice = prompt(
                "LABORATORY\n" +
                "You wake up in a locked laboratory.\n\n" +
                "1. Search the desk\n" +
                "2. Go to the Security Room\n" +
                "3. Quit game"
            );

            if (choice === null) {
                alert("You cancelled the game.");
                return;
            }

            choice = choice.trim().toLowerCase();

            if (choice === "3") {
                alert("Game ended. Thanks for playing!");
                return;
            } else if (choice === "1") {
                if (!hasKeycard) {
                    hasKeycard = true;
                    alert("You found a keycard!");
                } else {
                    alert("The desk is empty. You already have the keycard.");
                }
            } else if (choice === "2") {
                currentRoom = "security";
            } else {
                alert("Invalid choice. Enter 1, 2, or 3.");
            }

        } else if (currentRoom === "security") {
            choice = prompt(
                "SECURITY ROOM\n" +
                "Screens monitor the entire facility.\n\n" +
                "1. Search the computer\n" +
                "2. Go to the Server Room\n" +
                "3. Return to the Laboratory"
            );

            if (choice === null) {
                alert("You cancelled the game.");
                return;
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (!hasCode) {
                    hasCode = true;
                    alert("You discovered the server shutdown code!");
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
            choice = prompt(
                "SERVER ROOM\n" +
                "NEXUS controls the facility from here.\n\n" +
                "1. Shut down NEXUS\n" +
                "2. Return to the Security Room\n" +
                "3. Go to the Exit Gate"
            );

            if (choice === null) {
                alert("You cancelled the game.");
                return;
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (nexusDown) {
                    alert("NEXUS is already offline.");
                } else if (hasCode) {
                    nexusDown = true;
                    alert("You enter the code and shut down NEXUS!");
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
            choice = prompt(
                "EXIT GATE\n" +
                "The final door stands before you.\n\n" +
                "1. Attempt to escape\n" +
                "2. Return to the Server Room"
            );

            if (choice === null) {
                alert("You cancelled the game.");
                return;
            }

            choice = choice.trim().toLowerCase();

            if (choice === "1") {
                if (hasKeycard && nexusDown) {
                    alert("SUCCESS! You escaped the facility!");
                } else if (hasKeycard) {
                    alert("NEXUS is still online and seals the gate as you swipe the keycard!");
                    alert("GAME OVER! The facility is now permanently locked.");
                } else {
                    alert("NEXUS caught you trying to escape without the required items!");
                    alert("GAME OVER! The facility is now permanently locked.");
                }

                gameOver = true;

            } else if (choice === "2") {
                currentRoom = "server";
            } else {
                alert("Invalid choice. Enter 1 or 2.");
            }
        }
    }

    // Offer the player another game after an ending.
    const playAgain = confirm("Would you like to play again?");

    if (playAgain) {
        startGame();
    } else {
        alert("Thanks for playing Escape the Evil AI!");
    }
}