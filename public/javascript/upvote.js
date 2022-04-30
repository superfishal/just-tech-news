async function upvoteClickHandler(event) {
  event.preventDefault();

  console.log("button clicked");
}

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
