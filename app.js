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
    const storedJobApps = localStorage.getItem('jobApps')
    const jobAppObject = JSON.parse(storedJobApps);
    console.log(typeof jobAppObject)
    jobAppObject.forEach (job => {
        const tr = document.createElement("tr");
        Object.entries(job).forEach(([key, value]) =>{
            const td = document.createElement("td");
            tr.classList = "job-item";
            console.log("Key:", key, "Value:", value);
            td.classList = `job-${key}`
            td.innerText = value == null ? "" : String(value);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "x";
        deleteButton.classList = " btn delete-btn";
        tr.appendChild(deleteButton);
        const editButton = document.createElement("button")
        editButton.innerText = "edit";
        editButton.classList = " btn edit-btn";
        tr.appendChild(editButton);


    });
};
function deleteJob(event){
    console.log("delete!")
    const jobItem = event.target.closest(".job-item");
    const jobId = jobItem.querySelector(".job-id").textContent;
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const updatedJobs = jobApps.filter(job => job.id !== jobId);
    localStorage.setItem("jobApps", JSON.stringify(updatedJobs));
    console.log(updatedJobs);
    displayJob();
};

function editJob(event){
    const jobItem = event.target.closest(".job-item");
    const jobId = jobItem.querySelector(".job-id").textContent;
    dialog.showModal();
//✅ Pre-fill the dialog fields with the job’s data
//✅ Save the updated job back to localStorage
//✅ Close the modal on cancel
//✅ Clean up your displayJob() rendering
};
const dialog = document.querySelector("dialog");
const submitEdit = document.querySelector("dialog button")