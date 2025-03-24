document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

    let selectedCharacter = 0;

    fetch("http://localhost:3000/characters")
        .then((response) => response.json())
        .then((characters) => {
            characters.forEach((character) => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacterDetails(character));
                characterBar.appendChild(span);
            });
        });
     function displayCharacterDetails(character) {
            selectedCharacter = character.id;
            nameElement.textContent = character.name;
            imageElement.src = character.image;
            imageElement.alt = character.name;
            voteCountElement.textContent = character.votes;
        }
        voteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const voteInput = document.getElementById("votes");
            const votesToAdd = parseInt(voteInput.value) || 0;
            if (selectedCharacter === 0) {
                alert("Select a character first!");
                return;
            }
            const newVoteCount = parseInt(voteCountElement.textContent) + votesToAdd;
            voteCountElement.textContent = newVoteCount;
            voteInput.value = "";
        });
