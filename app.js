// Captured Elements
const applicationForm = document.getElementById("applicationForm");
//const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
const tableBody = document.getElementById("table-body");
// Event Listeners
applicationForm.addEventListener("submit", createJob);
tableBody.addEventListener('click', (event) => {
    if(event.target.classList.contains("delete-btn")){
        deleteJob(event);
    } else if (event.target.classList.contains("edit-btn")) {
        editJob(event)
    }
});
// Load Job Applications
displayJob()

// CRUD Functions
function createJob (event) {
    event.preventDefault();
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const job = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        company: document.getElementById("company").value,
        position: document.getElementById("position").value,
        status: document.getElementById("status-select").value,
        dateApplied: document.getElementById("date-applied").value,
        jobUrl: document.getElementById("job-url").value,
        notes: document.getElementById("job-notes").value,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    jobApps.push(job);
    console.log(jobApps);
    localStorage.setItem("jobApps", JSON.stringify(jobApps));
    applicationForm.reset();
    displayJob();
}
function displayJob(){
    tableBody.textContent = "";
    const jobApps = JSON.parse(localStorage.getItem('jobApps')) || [];
    console.log("Loaded:", jobApps);
    jobApps.forEach (job => {
        console.log()
        const tr = document.createElement("tr");
        tr.classList = "job-item";
        //ID column
        const tdId = document.createElement("td");
        tdId.classList.add("job-id", "hidden");
        tdId.innerText = job.id;
        tr.appendChild(tdId);
        
        const fields = ["company", "position", "status", "dateApplied", "jobUrl", "notes", "createdAt", "updatedAt"];
        fields.forEach(field => {
            const td = document.createElement("td");
            td.classList.add(`job-${field}`);
            td.innerText = job[field] ?? "";
            if (field === "createdAt" || field === "updatedAt") td.classList.add("hidden");
            tr.appendChild(td);
        });

        //Buttons
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "x";
        deleteButton.classList = " btn delete-btn";
        tr.appendChild(deleteButton);

        const editButton = document.createElement("button")
        editButton.innerText = "edit";
        editButton.classList = " btn edit-btn";
        tr.appendChild(editButton);
        tableBody.appendChild(tr);
    });
};
function deleteJob(event){
    const jobItem = event.target.closest(".job-item");
    const jobId = jobItem.querySelector(".job-id").textContent.trim();
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const updatedJobs = jobApps.filter(job => job.id !== jobId);
    localStorage.setItem("jobApps", JSON.stringify(updatedJobs));
    displayJob();
};

function editJob(event){
    const jobItem = event.target.closest(".job-item");
    const jobId = jobItem.querySelector(".job-id").textContent.trim();
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const jobToEdit = jobApps.find(job => job.id === jobId) //this is reference to the 
    console.log(jobToEdit)
    console.log(jobApps)
    if (!jobToEdit) return;

    dialog.showModal();
    
    //Pre-fill
    document.getElementById("edit-id").append(` ${jobToEdit.id}`);
    document.getElementById("edit-company").value = jobToEdit.company;
    document.getElementById("edit-position").value = jobToEdit.position;
    document.getElementById("edit-status-select").value = jobToEdit.status;
    document.getElementById("edit-date-applied").value = jobToEdit.dateApplied;
    document.getElementById("edit-job-url").value = jobToEdit.jobUrl;
    document.getElementById("edit-job-notes").value = jobToEdit.notes;
    document.getElementById("edit-created-at").append(` ${jobToEdit.createdAt}`);
    document.getElementById("edit-updated-at").append(` ${jobToEdit.updatedAt}`);
    
    // Submit updated values
    
    const editForm = document.getElementById("edit-applicationForm");
    
    editForm.onsubmit = (e) => {
        e.preventDefault();
        // Assign new values to edited job
        jobToEdit.company = document.getElementById("edit-company").value;
        jobToEdit.position = document.getElementById("edit-position").value;
        jobToEdit.status = document.getElementById("edit-status-select").value;
        jobToEdit.dateApplied = document.getElementById("edit-date-applied").value;
        jobToEdit.jobUrl = document.getElementById("edit-job-url").value;
        jobToEdit.notes = document.getElementById("edit-job-notes").value;
        jobToEdit.updatedAt = document.getElementById("edit-updated-at").value;
        console.log(jobToEdit);
        console.log(jobApps);
        // set to storage
        localStorage.setItem("jobApps", JSON.stringify(jobApps));
        dialog.close();
        displayJob();
    };
    //display
    
//✅ Close the modal on cancel
//✅ Clean up your displayJob() rendering
};
const dialog = document.querySelector("dialog");
const submitEdit = document.querySelector("dialog button");