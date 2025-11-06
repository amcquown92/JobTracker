const form = document.getElementById("applicationForm");
const jobApps = JSON.parse(localStorage.getItem("jobApps")) || [];
form.addEventListener("submit", createJobApp)

function createJobApp (event) {
    event.preventDefault();
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
    form.reset()
}
function displayJobApps(){
    const storedJobApps = localStorage.getItem('jobApps')
    const jobAppObject = JSON.parse(storedJobApps);
    jobAppObject.forEach (jobApp => {
        
    });
};