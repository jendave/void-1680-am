// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {})
};

function resetRollTables(item, index) {
    game.tables.getName(item).resetResults();;
}

try {
    let rollTableName = "The Second Song Block: Diamonds";
    let rollTableTitle = "The Second Song Block";
    let title = "<h2>" + rollTableTitle + "</h2>";
    let message = "In general, the songs in the second block increase the intensity of the playlist, building toward an emotional climax. This doesn’t necessarily mean the songs have to be faster, or louder; think emotional intensity, which is not always expressed with volume.";

    printMessage(title + message);
    const songBlockRoll = await game.tables.getName(rollTableName).drawMany(3, options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });

    rollTableName = "Caller ID";
    rollTableTitle = "When a Stranger Calls";
    title = "<h3>" + rollTableTitle + "</h3>";
    message = "During each song block, someone will call in to talk with you – or at the very least, talk at you. People who call in to radio shows to talk are acting on a strong, simple need to be heard, no matter by who. In that way, you are very alike.";

    printMessage(title + message);
    let callerRoll = await game.tables.getName(rollTableName).draw(options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });

    if (game.release.generation < 13) {
        if (callerRoll.results[1].text.includes("Diamonds")) {
            let items = [songBlockRoll.results[0], songBlockRoll.results[1], songBlockRoll.results[2]]
            items.sort((a, b) => b.range[0] - a.range[0]);

            printMessage("The Caller is calling about the song you played for \"" + items[0].description + "\"");

        } else if (callerRoll.results[1].text.includes("Spades")) {
            printMessage("The Caller is making a request");
            const callerRequestTableName = "Caller Request Table"
            await game.tables.getName(callerRequestTableName).draw(options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });
        } else {
            printMessage("The Caller has no attachment to the music. They just want to talk to someone.")
        }
    } else {
        if (callerRoll.results[1].name.includes("Diamonds")) {
            let items = [songBlockRoll.results[0], songBlockRoll.results[1], songBlockRoll.results[2]]
            items.sort((a, b) => b.range[0] - a.range[0]);

            printMessage("<h6>The Caller is calling about the song you played for \"" + items[0].description + "\"</h6>");

        } else if (callerRoll.results[1].name.includes("Spades")) {
            printMessage("<h6>The Caller is making a request</h6>");
            const callerRequestTableName = "Caller Request Table"
            await game.tables.getName(callerRequestTableName).draw(options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });
        } else {
            printMessage("<h6>The Caller has no attachment to the music. They just want to talk to someone.</h6>")
        }
    }
}
catch (e) {
    console.log(e);
}
