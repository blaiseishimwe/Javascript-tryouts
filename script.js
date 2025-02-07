//Add a comment to test Git

document
  .querySelector("#details_form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("called");

  var productName = event.target.elements["name"].value;
  var productQuantity = event.target.elements["quantity"].value;
  var productPhoto = event.target.elements["photo"].value;
  var productDescription = event.target.elements["description"].value;

  console.log(productDescription);

  resetFormValues(event.target);

  var shoppingCard = createShoppingCard(
    productName,
    productQuantity,
    productPhoto,
    productDescription
  );

  var actualList = document.getElementById("shopping_container");

  //After creating the first item on the list change fro, Any other... to My list

  if (actualList.children.length === 0) {
    document.getElementById("title").innerHTML = "My List";
  }

  document.getElementById("shopping_container").appendChild(shoppingCard);
}

// after submitting and creating the card let the form refresh to be able to hold another item

function resetFormValues(form) {
  for (var i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

//styling the card: size,height and display

function createShoppingCard(name, quantity, photoUrl, description) {
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px";

  var img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  // if the user doesn't add a photo url, use this constant photo url

  var constantPhotoUrl = "C:UsersdesktopDesktopjs\bball.jpg";

  if (photoUrl.length === 0) {
    setAttribute("src", constantPhotoUrl);
  } else {
    img.setAttribute("src", photoUrl);
  }
  card.appendChild(img);

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  var cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = quantity;
  cardBody.appendChild(cardSubtitle);

  if (description !== 0) {
    var cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  // add bootstrap buttons to the card itself
  var buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "button_container");

  var cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editProduct);

  var cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeProduct);

  buttonContainer.appendChild(cardEditBtn);
  buttonContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonContainer);

  card.appendChild(cardBody);

  return card;
}

// incase the user wants to the a card let them do it as an alert
function editProduct(event) {
  var cardBody = event.target.parentElement.parentElement;
  var title = cardBody.children[0];
  var subTitle = cardBody.children[1];

  var card = cardBody.parentElement;
  var photoUrl = card.children[0];

  var newTitle = window.prompt("Enter New Name");
  var newSubTitle = window.prompt("Enter New Quantity");
  var newPhotoUrl = window.prompt("Enter New photo Url");

  if (newTitle.length > 0) {
    title.innerTitle = newTitle;
  }

  if (newSubTitle.length > 0) {
    subTitle.innerTitle = newSubTitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeProduct(event) {
  var cardBody = event.target.parentElement.parentElement;
  var card = cardBody.parentElement;
  card.remove();
}
