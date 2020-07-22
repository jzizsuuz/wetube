import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteButton = document.querySelectorAll(".jsDeleteBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (node) => {
  node.remove();
  decreaseNumber();
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerHTML = comment;
  deleteBtn.innerHTML = "❌";
  li.appendChild(span);
  li.appendChild(deleteBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const sendCommentID = async (commentId, li) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    deleteComment(li);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleDelete = (event) => {
  event.preventDefault();
  const li = event.target.parentNode;
  const commentId = li.querySelector("#jsCommentId").innerHTML;
  console.log(commentId);
  sendCommentID(commentId, li);
};

function init() {
  if (!addCommentForm.hasAttribute("disabled"))
    addCommentForm.addEventListener("submit", handleSubmit);
  if (deleteButton)
    deleteButton.forEach((del) => {
      del.addEventListener("click", handleDelete);
    });
}

if (addCommentForm) {
  init();
}
