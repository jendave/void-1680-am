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
    let rollTableName = "The First Song Block: Clubs";
    let rollTableTitle = "The First Song Block";
    let title = "<h2>" + rollTableTitle + "</h2>";
    let message = "These songs are your thesis statement: a declaration of your show’s tone and depth. They are also typically (but not necessarily) higher energy.";

    printMessage(title + message);
    const songBlockRoll = await game.tables.getName(rollTableName).drawMany(3, options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });

    rollTableName = "Caller ID - Voices in the Void";
    rollTableTitle = "When a Stranger Calls";
    title = "<h3>" + rollTableTitle + "</h3>";
    message = "During each song block, someone will call in to talk with you – or at the very least, talk at you. People who call in to radio shows to talk are acting on a strong, simple need to be heard, no matter by who. In that way, you are very alike.";

    printMessage(title + message);
    let callerRoll = await game.tables.getName(rollTableName).draw(options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });
    if (callerRoll.results[1].name.includes("Clubs")) {
        let items = [songBlockRoll.results[0], songBlockRoll.results[1], songBlockRoll.results[2]]
        items.sort((a, b) => b.range[0] - a.range[0]);

        printMessage("<h6>The Caller is calling about the song you played for \"" + items[0].description + "\"</h6>");

    } else if (callerRoll.results[1].name.includes("Diamonds")) {
        printMessage("<h6>The Caller is making a request</h6>");
        const callerRequestTableName = "Caller Request Table - Voices in the Void"
        await game.tables.getName(callerRequestTableName).draw(options = { recursive: true, rollMode: game.settings.get("core", "rollMode") });
    } else {
        printMessage("<h6>The Caller has no attachment to the music. They just want to talk to someone.</h6>")
    }
}
catch (e) {
    console.log("Resetting tables.");
    const rollTableNames = ["The First Song Block: Clubs", "The Second Song Block: Diamonds", "The Third Song Block: Spades", "The Fourth Song Block: Hearts", "Caller ID", "Caller ID - Voices in the Void"];

    rollTableNames.forEach(resetRollTables);
}
