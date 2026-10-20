// Escape the Evil AI - Project NEXUS

function startGame() {
    alert("Welcome to Escape the Evil AI!");
    alert("You are trapped in a research facility controlled by NEXUS.");
    alert("Explore the rooms, collect clues, and find a way to escape!");

    let hasKeycard = false;
    let hasCode = false;
    let currentRoom = "laboratory";

    while (true) {
        let choice;

        if (currentRoom === "laboratory") {
            choice = prompt(
                "LABORATORY\n" +
                "You wake up in a locked laboratory.\n\n" +
                "1. Search the desk\n" +
                "2. Go to the Security Room\n" +
                "3. Quit game"
            );

            if (choice === null || choice === "3") {
                alert("Game ended. Thanks for playing!");
                return;
            }

            if (choice === "1") {
                if (!hasKeycard) {
                    hasKeycard = true;
                    alert("You found a keycard!");
                } else {
                    alert("The desk is empty.");
                }
            } else if (choice === "2") {
                currentRoom = "security";
            } else {
                alert("Invalid choice. Enter 1, 2, or 3.");
            }

        } else if (currentRoom === "security") {
            choice = prompt(
                "SECURITY ROOM\n" +
                "Screens show cameras throughout the facility.\n\n" +
                "1. Search the computer\n" +
                "2. Go to the Server Room\n" +
                "3. Return to the Laboratory"
            );

            if (choice === null) {
                alert("Game ended. Thanks for playing!");
                return;
            }

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
                "The evil AI NEXUS controls the facility from here.\n\n" +
                "1. Shut down NEXUS\n" +
                "2. Return to the Security Room\n" +
                "3. Go to the Exit Gate"
            );

            if (choice === null) {
                alert("Game ended. Thanks for playing!");
                return;
            }

            if (choice === "1") {
                if (hasCode) {
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
                "1. Unlock the exit\n" +
                "2. Return to the Server Room"
            );

            if (choice === null) {
                alert("Game ended. Thanks for playing!");
                return;
            }

            if (choice === "1") {
                if (hasKeycard && hasCode) {
                    alert("SUCCESS! You escaped the facility!");
                    return;
                } else {
                    alert("The door remains locked! You need the keycard and shutdown code.");
                }
            } else if (choice === "2") {
                currentRoom = "server";
            } else {
                alert("Invalid choice. Enter 1 or 2.");
            }
        }
    }
}
