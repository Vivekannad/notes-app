// const addNewNoteBtn = document.getElementById("addBtn");
// const noteTitle = document.getElementById("note-title");
// const noteDescription = document.getElementById("note-dsc");
// const notesPreviewContainer = document.querySelector(".notes-preview-container");
// let closeIcon;
// const notes = notesPreviewContainer.children;

// const noteDetail = []
// let noteCount = 0;

// addNewNoteBtn.addEventListener("click", addNewNote);

// function noteDeleteEventHandler() {
//     closeIcon.forEach((icon) => {
//         icon.addEventListener("click", (e) => {
//             e.stopPropagation(); // Prevent note opening when deleting
//             const index = parseInt(icon.id);
//             noteDeleteHandler(index);
//             updateNotesPreview();
//         });
//     });
// }

// function addedNotesClickHandler () {
//     Array.from(notes).forEach(
//         (element, index) => {
//             element.addEventListener("click", () => { showAddedNote(index)})
//         }
//     )
// }


// function addNewNote() {
//     const dated = new Date();
//     const noteTime = dated.toLocaleString('en-US', { weekday: "long", year: "numeric", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false })
//     let description = noteDescription.value;
//     let title = noteTitle.value;

//     if (!noteTitle.value) {
//         title = "unknown";
//     }
//     noteDetail[noteCount] = {
//         title,
//         description,
//         noteTime
//     };
//     updateNotesPreview();
    
//         clearAddedNote();
//     noteCount = noteDetail.length;
// }

// function updateNotesPreview() {
//     notesPreviewContainer.innerHTML = "";
//     console.log("Note add")
//     for(let i = 0; i < noteDetail.length; i++){

//         let descript = noteDetail[i].description;
//         if(descript.length > 80){
//              descript = descript.substring(0,80) + "...";
//         }
//         const notePreview = `<div class="note">
//                     <h1 >${noteDetail[i].title}</h1>
//                     <h3 >${descript}</h3>
//                     <p class = "date">${noteDetail[i].noteTime}</p>
//                     <div class="close" id=${i}><i class="fa-solid fa-xmark"></i></div>
//         </div>
//                     `;
//         notesPreviewContainer.innerHTML += notePreview;
//     }
//     closeIcon = document.querySelectorAll(".close");
//     noteDeleteEventHandler();
//     addedNotesClickHandler();
// }
// function clearAddedNote() {
//     noteDescription.value = "";
//     noteTitle.value = "";

// }

// function showAddedNote (index) {
//     noteDescription.value = noteDetail[index].description;
//     noteTitle.value = noteDetail[index].title;
//     noteCount = index;
// }

// function noteDeleteHandler(index) {
//     console.log(index);
//     noteDetail.splice(index , 1);
//     console.log(noteDetail);
// }


const addNewNoteBtn = document.getElementById("addBtn");
const noteTitle = document.getElementById("note-title");
const noteDescription = document.getElementById("note-dsc");
const notesPreviewContainer = document.querySelector(".notes-preview-container");

let notesData =  JSON.parse(localStorage.getItem("notes")) || [];

// Event delegation for handling note deletion & opening
notesPreviewContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".close");
    if (target) {
        e.stopPropagation();
        noteDeleteHandler(parseInt(target.id));
        updateNotesPreview();
        return;
    }
    
    const noteElement = e.target.closest(".note");
    if (noteElement) {
        const index = parseInt(noteElement.dataset.index);
        showAddedNote(index);
    }
});

addNewNoteBtn.addEventListener("click", addNewNote);

function addNewNote() {
    const dated = new Date();
    const noteTime = dated.toLocaleString('en-US', {
        weekday: "long", year: "numeric", day: "numeric", month: "long", 
        hour: "2-digit", minute: "2-digit", hour12: false 
    });

    const title = noteTitle.value.trim() || "Unknown";
    const description = noteDescription.value.trim();

    notesData.push({ title, description, noteTime });
    updateNotesPreview();
    clearAddedNote();
    saveToLocalStorage();
}

function updateNotesPreview() {
    notesPreviewContainer.innerHTML = notesData.map((note, i) => `
        <div class="note" data-index="${i}">
            <h1>${note.title}</h1>
            <h3>${note.description.length > 80 ? note.description.substring(0, 80) + "..." : note.description}</h3>
            <p class="date">${note.noteTime}</p>
            <div class="close" id="${i}"><i class="fa-solid fa-xmark"></i></div>
        </div>
    `).join("");
}

function clearAddedNote() {
    noteDescription.value = "";
    noteTitle.value = "";
}

function showAddedNote(index) {
    const note = notesData[index];
    if (!note) return;
    noteDescription.value = note.description;
    noteTitle.value = note.title;
}

function noteDeleteHandler(index) {
    notesData.splice(index, 1);
    saveToLocalStorage();
}

function saveToLocalStorage () {
    localStorage.setItem("notes", JSON.stringify(notesData));
}

updateNotesPreview();