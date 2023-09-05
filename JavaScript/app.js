const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeBtn = document.querySelector(".close");
const addBtn = document.getElementById("add-btn");
const titleTag = document.getElementById("note-title");
const descTag = document.getElementById("note-text");
const popupTitle = document.querySelector(".popup-title");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdated = false,
  updatedId;

//Open and Close popup box
addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  isUpdated = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.textContent = "Add Note";
  popupTitle.textContent = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let noteContent = `
    <li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span>${note.desc}</span>
      </div>
      <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
          <i class="fa-solid fa-ellipsis" onclick="showMenu(this)"></i>
          <ul class="menu">
            <li onclick="updateNote(${index}, '${note.title}', '${note.desc}')">
              <i class="fa-solid fa-pen" ></i>
              Edit
            </li>
            <li onclick="deleteNote(${index})">
              <i class="fa-solid fa-trash"></i>
              Delete
            </li>
          </ul>
        </div>
      </div>
  </li>`;
    addBox.insertAdjacentHTML("afterend", noteContent);
  });
}
showNotes();
function showMenu(elem) {
  //show and close menu button with show-menu class
  elem.parentNode.classList.add("show-menu");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentNode.classList.remove("show-menu");
    }
  });
}

function deleteNote(noteId) {
  let confirmBox = confirm("Are you sure you want to delete this note?");
  if (!confirmBox) return;
  //removing the note from notes
  notes.splice(noteId, 1);
  //save updated notes in local storage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdated = true;
  updatedId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.textContent = "Update Note";
  popupTitle.textContent = "Update a Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value.trim();
  let noteDesc = descTag.value.trim();

  if (noteTitle || noteDesc) {
    //getting the date object
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    //Note object
    let noteInfo = {
      title: noteTitle,
      desc: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdated) {
      notes.push(noteInfo); //adding the note to the notes array
    } else {
      isUpdated = false;
      notes[updatedId] = noteInfo; // updateing the specified note
    }
    //save in the local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeBtn.click();
    showNotes();
  }
});
