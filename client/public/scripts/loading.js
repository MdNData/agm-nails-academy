const container = createElement("div");

//Create and return an HTML element
function createElement(elementType) {
  return document.createElement(elementType);
}

//Add Child Element to Parent
function addChildToParent(child, parent) {
  parent.appendChild(child);
}

//Change the Text of an element
function changeText(element, text) {
  element.innerText = text;
}

//Change the classes
function changeClass(element, item) {
  element.className = item;
}
function loading() {
  changeClass(container, "loading");
  addChildToParent(container, document.body);

  const internalContainer = createElement("div");
  addChildToParent(internalContainer, container);

  const spinner = createElement("div");
  changeClass(spinner, "loading-spinner");
  addChildToParent(spinner, internalContainer);

  const textLoading = createElement("p");
  changeText(textLoading, "Loading");
  addChildToParent(textLoading, internalContainer);
}

function endLoading() {
  container.innerHTML = " ";
  container.remove();
}

// Start the loading animation when the page is opening
window.addEventListener("DOMContentLoaded", function () {
  loading();
});

// End the loading animation when the page finishes loading
window.addEventListener("load", function () {
  endLoading();
});
