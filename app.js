const addNewNoteBtn = document.getElementById("addBtn");
const noteTitle = document.getElementById("note-title");
const noteDescription = document.getElementById("note-dsc");
const notesPreviewContainer = document.querySelector(".notes-preview-container");
let closeIcon;
const notes = notesPreviewContainer.children;

const noteDetail = []
let noteCount = 0;

addNewNoteBtn.addEventListener("click", addNewNote);

function noteDeleteEventHandler() {
    closeIcon.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent note opening when deleting
            const index = parseInt(icon.id);
            noteDeleteHandler(index);
            updateNotesPreview();
        });
    });
}

function addedNotesClickHandler () {
    Array.from(notes).forEach(
        (element, index) => {
            element.addEventListener("click", () => { showAddedNote(index)})
        }
    )
}


function addNewNote() {
    const dated = new Date();
    const noteTime = dated.toLocaleString('en-US', { weekday: "long", year: "numeric", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false })
    let description = noteDescription.value;
    let title = noteTitle.value;

    if (!noteTitle.value) {
        title = "unknown";
    }
    noteDetail[noteCount] = {
        title,
        description,
        noteTime
    };
    updateNotesPreview();
    
        clearAddedNote();
    noteCount = noteDetail.length;
}

function updateNotesPreview() {
    notesPreviewContainer.innerHTML = "";
    console.log("Note add")
    for(let i = 0; i < noteDetail.length; i++){

        let descript = noteDetail[i].description;
        if(descript.length > 80){
             descript = descript.substring(0,80) + "...";
        }
        const notePreview = `<div class="note">
                    <h1 >${noteDetail[i].title}</h1>
                    <h3 >${descript}</h3>
                    <p class = "date">${noteDetail[i].noteTime}</p>
                    <div class="close" id=${i}><i class="fa-solid fa-xmark"></i></div>
        </div>
                    `;
        notesPreviewContainer.innerHTML += notePreview;
    }
    closeIcon = document.querySelectorAll(".close");
    noteDeleteEventHandler();
    addedNotesClickHandler();
}
function clearAddedNote() {
    noteDescription.value = "";
    noteTitle.value = "";

}

function showAddedNote (index) {
    noteDescription.value = noteDetail[index].description;
    noteTitle.value = noteDetail[index].title;
    noteCount = index;
}

function noteDeleteHandler(index) {
    console.log(index);
    noteDetail.splice(index , 1);
    console.log(noteDetail);
}


