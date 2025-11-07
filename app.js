// Captured Elements
const applicationForm = document.getElementById("applicationForm");
//const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
const tableBody = document.getElementById("table-body");
// Event Listeners
applicationForm.addEventListener("submit", createJobApp);
tableBody.addEventListener('click', (event) => {
    if(event.target.classList.contains("delete-btn")){
        deleteJobApp(event);
    }
});
// Load Job Applications
displayJobApps()

// CRUD Functions
function createJobApp (event) {
    event.preventDefault();
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const jobApp = {
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
    jobApps.push(jobApp);
    console.log(jobApps);
    localStorage.setItem("jobApps", JSON.stringify(jobApps));
    applicationForm.reset();
    displayJobApps();
}
function displayJobApps(){
    tableBody.textContent = "";
    const storedJobApps = localStorage.getItem('jobApps')
    const jobAppObject = JSON.parse(storedJobApps);
    console.log(typeof jobAppObject)
    jobAppObject.forEach (jobApp => {
        const tr = document.createElement("tr");
        Object.entries(jobApp).forEach(([key, value]) =>{
            const td = document.createElement("td");
            tr.classList = "job-item";
            console.log("Key:", key, "Value:", value);
            // if (key === "id") return;
            if (key === "id") {
                td.classList = "job-id";
            };
            td.innerText = value == null ? "" : String(value);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "x";
        deleteButton.classList = " btn delete-btn";
        tr.appendChild(deleteButton);


    });
};
function deleteJobApp(event){
    console.log("delete!")
    const jobItem = event.target.closest(".job-item");
    const jobId = jobItem.querySelector(".job-id").textContent;
    const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
    const updatedJobs = jobApps.filter(job => job.id !== jobId);
    localStorage.setItem("jobApps", JSON.stringify(updatedJobs));
    console.log(updatedJobs);
    displayJobApps();
};