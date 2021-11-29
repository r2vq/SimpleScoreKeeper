let scoresDiv = document.querySelector("#scores");

/********************
 * Helper Functions *
 ********************/
HTMLElement.prototype.addChild = function(name) {
  let element = document.createElement(name);
  this.appendChild(element);
  return element;
}

HTMLElement.prototype.addClass = function(name) {
  this.classList.add(name);
  return this;
};

HTMLElement.prototype.addClickListener = function(click) {
  this.addEventListener("click", click);
  return this;
}

HTMLElement.prototype.addProperty = function(name, value) {
  this.setAttribute(name, value);
  return this;
}

HTMLElement.prototype.removeClass = function(name) {
  this.classList.remove(name);
  return this;
};

HTMLElement.prototype.setId = function(name) {
  this.id = name;
  return this;
}

HTMLElement.prototype.setText = function(text) {
  this.innerText = text;
  return this;
};

/**********************
 * Callback Functions *
 **********************/
document.addEventListener("click", e => {
  let element = e.target;
  switch (element.id) {
    case "addButton":
      onAddClick();
      break;
  }
});

function addPlayer(name, initialScore) {
  let playersWrapper = document.querySelector("#players");

  let playerBox = playersWrapper.addChild("div")
    .addClass("playerBox");

  let nameRow = playerBox.addChild("div")
    .addClass("playerNameRow");
  let player = nameRow.addChild("div")
    .addClass("player")
    .setText(name);
  let deleteButton = nameRow.addChild("input")
    .addClass("delete")
    .addProperty("type", "button")
    .addProperty("value", "X")
    .addClickListener(e => {
      onDeleteClick(name, playerBox);
    });

  let score = initialScore;

  let scoreRow = playerBox.addChild("div")
    .addClass("playerScoreRow")
    .setText(score);

  if (score < 0) {
    scoreRow.addClass("negative");
  }

  let modifierRow = playerBox.addChild("div")
    .addClass("playerModifierRow");
  let decreaseButton = modifierRow.addChild("input")
    .addClass("playerDecrease")
    .addProperty("type", "button")
    .addProperty("value", "-")
    .addClickListener(e => {
      score = updateScore(name, score, -parseInt(changeInput.value), scoreRow);
    });
  let changeInput = modifierRow.addChild("input")
    .addClass("playerChange")
    .addProperty("type", "number")
    .addProperty("value", 100);
  let increaseButton = modifierRow.addChild("input")
    .addClass("playerIncrease")
    .addProperty("type", "button")
    .addProperty("value", "+")
    .addClickListener(e => {
      score = updateScore(name, score, parseInt(changeInput.value), scoreRow);
    });
}

function onAddClick() {
  let input = document.querySelector("#nameInput");
  let name = input.value;
  if (name == "") {
    alert("Please enter a name");
    return;
  }
  if (localStorage.getItem(name)) {
    return;
  }

  addPlayer(name, 0);
  localStorage.setItem(name, 0);
  input.value = "";
}

function onDeleteClick(name, player) {
  let shouldDelete = confirm("Remove this user? This can't be undone.");
  if (shouldDelete) {
    player.remove();
    localStorage.removeItem(name);
  }
}

function updateScore(name, oldScore, change, scoreRow) {
  if (isNaN(change)) {
    alert(`That is not a number. Please enter a real number.`)
    return score;
  }
  let score = oldScore + change;
  scoreRow.setText(score);
  if (score < 0) {
    scoreRow.addClass("negative");
  } else {
    scoreRow.removeClass("negative");
  }
  localStorage.setItem(name, score);
  return score;
}

/***************
 * Main Method *
 ***************/
(function() {
  // Inputs
  let inputWrapper = scoresDiv.addChild("div")
    .addClass("inputWraper");
  // Create Name Input
  inputWrapper.addChild("input")
    .addClass("name")
    .addProperty("placeholder", "Player Name")
    .setId("nameInput");
  // Create Add Button
  inputWrapper.addChild("input")
    .addClass("add")
    .addProperty("type", "button")
    .addProperty("value", "Add")
    .setId("addButton");

  // For the players
  let playersWrapper = scoresDiv.addChild("div")
    .addClass("playersWrapper")
    .setId("players");

  for (var i = 0, len = localStorage.length; i < len; ++i) {
    let savedName = localStorage.key(i);
    let savedScore = parseInt(localStorage.getItem(savedName));
    addPlayer(savedName, savedScore);
  }
})();
