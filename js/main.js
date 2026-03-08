
const issuesContainer = document.getElementById("issue-container");
const issueCont = document.getElementById("issue-count");
const loadingContainer = document.getElementById("loading-container");
const modalContainer = document.getElementById("modal-container");
const searchIssue = document.getElementById("search-btn")
let openIssues = [];
let closedIssues = [];

const loadIssue = async () => {
    loading(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssue(data.data);
}

const loadIssueModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const data = await res.json()
    displayModal(data.data)
}


// loading 
const loading = (status) => {
    if (status == true) {
        loadingContainer.classList.remove("hidden")
    } else {
        loadingContainer.classList.add("hidden")
    }
}


// button active color
const buttonActive = (text) => {


    const allBtn = document.getElementById("all-btn");
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");

    if (text == "all") {
        allBtn.classList.add("btn-primary");
        allBtn.classList.remove("text-[#64748B]", "bg-[#FFFFFF]")
        openBtn.classList.remove("btn-primary");
        closedBtn.classList.remove("btn-primary");
        loadIssue();

    }
    else if (text == "open") {
        issuesContainer.innerHTML = "";
        openBtn.classList.remove("text-[#64748B]", "bg-[#FFFFFF]");
        allBtn.classList.remove("btn-primary");
        closedBtn.classList.remove("btn-primary");
        openBtn.classList.add("btn-primary");
        displayIssue(openIssues);
    } else {
        issuesContainer.innerHTML = "";
        closedBtn.classList.remove("text-[#64748B]", "bg-[#FFFFFF]");
        allBtn.classList.remove("btn-primary");
        openBtn.classList.remove("btn-primary");
        closedBtn.classList.add("btn-primary");
        issueCont.innerText = 0;
        displayIssue(closedIssues);
    }
}

const displayIssue = (issues) => {
    issuesContainer.innerHTML = "";

    issues.forEach(issue => {
        let year = issue.createdAt.slice(0, 4);
        let date = issue.createdAt.slice(8, 10);
        let month = issue.createdAt.slice(5, 7);

        const issueCard = document.createElement("div");
        issueCard.className = "p-4 rounded-lg shadow-xl";
        issueCard.onclick = () => loadIssueModal(issue.id);

        issueCard.innerHTML = `
                    <div class="flex justify-between items-center mb-3">
                        ${issue.status == "open"?`<img src="./assets/Open-Status.png" alt="">` :`<img src="./assets/Closed- Status .png" alt="">`}
                        <h3  class="priority-text text-sm font-medium text-[#EF4444] bg-[#FEECEC] py-2 px-8 rounded-full">${issue.priority}</h3>
                    </div>
                    <h2 class="text-[#1F2937] text-lg font-bold mb-2">${issue.title}</h2>
                    <p class="text-[#64748B] line-clamp-2 mb-3">${issue.description}</p>
                    <!-- labels -->
                    <div class="flex gap-1 mb-4 flex-wrap items-center">
                        <p
                            class="text-[12px] font-medium text-[#EF4444] bg-[#FEECEC] py-1.5 px-2 rounded-full border border-[#FECACA]"><i class="fa-solid fa-bug"></i>
                             ${issue.labels[0]}</p>
                        
                        <p> ${issue.labels[1] ? `<p class=" text-[12px]  font-medium text-[#D97706] bg-[#FFF8DB] py-1.5 px-2 rounded-full border border-[#FDE68A] "><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]} </p>` : ""}</p>
                    </div>

                    <!-- author & createdAt -->
                    <div class="p-4 border-t border-[#E4E4E7] text-[#64748B] space-y-2">
                        <p>#<span>1</span> <span>${issue.author}</span></p>
                        <p>${month}/${date}/${year}</p>
                    </div>
        `
        issuesContainer.appendChild(issueCard)
        if (issue.status == "open") {
            issueCard.classList.add("border-t-4", "border-[#00A96E]");
            openFilterIssues(issue, issue.id)
        } else {
            issueCard.classList.add("border-t-4", "border-[#A855F7]");
            closedFilterIssues(issue, issue.id)
        }
        
        
    })
    issueCont.innerText = issuesContainer.children.length;  
    loading(false)
}
const displayModal = (issue) => {
    let year = issue.createdAt.slice(0, 4);
    let date = issue.createdAt.slice(8, 10);
    let month = issue.createdAt.slice(5, 7);
    
    modalContainer.innerHTML = `
        <dialog id="issue_modal" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="text-2xl font-bold mb-3">${issue.title}</h3>
                    <p>${issue.status == "open" ? `<p class="text-[#64748B] text-sm"><span class="font-medium py-1.5 px-3 rounded-full bg-[#00A96E] text-[#FFFFFF]">Opened</span> • Opened by <span>${issue.author}</span> • <span>${date}/${month}/${year}</span></p>` : `<p class="text-[#64748B] text-sm"><span class="font-medium py-1.5 px-3 rounded-full bg-[#EF4444] text-[#FFFFFF]">Closed</span> • Closed by <span>${issue.author}</span> • <span>${date}/${month}/${year}</span></p>`} </p>
                    <div class="flex gap-1 my-6 ">
                        <p
                            class="text-sm font-medium text-[#EF4444] bg-[#FEECEC] py-2 px-4 rounded-full border border-[#FECACA]">
                            <i class="fa-solid fa-bug"></i> ${issue.labels[0]}</p>
                        
                        <p>${issue.labels[1]?`<p class=" text-sm font-medium text-[#D97706] bg-[#FFF8DB] py-2 px-5 rounded-full border border-[#FDE68A] "> <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</p>`: ""}</p>
                    </div>
                    <p class="pb-4 text-[#64748B]">Press ESC key or click the button below to close</p>
                    <div class="p-4 grid grid-cols-2 items-center gap-2.5">
                       <div class="right">
                        <p class="text-[#64748B]">Assignee:</p>
                        <h2 class="text-[#1F2937] font-semibold">${issue.author}</h2>
                       </div> 
                       <div class="left">
                        <p class="text-[#64748B]">Priority:</p>
                        <button class="btn bg-[#EF4444] text-white rounded-full">${issue.priority}</button>
                       </div> 
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `
    issue_modal.showModal()
}
const openFilterIssues = (issues, id) => {
    const existingItem = openIssues.find(item => item.id == id);
    if (!existingItem) {

        openIssues.push(issues)
    }
}
const closedFilterIssues = (issues, id) => {
    const existingItem = closedIssues.find(item => item.id == id);
    if (!existingItem) {

        closedIssues.push(issues)
    }
}

searchIssue.addEventListener("click",async()=>{
    const searchInput = document.getElementById("search-input");
    const search = searchInput.value.trim();
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`)
    const data = await res.json();
    displayIssue(data.data)
})



loadIssue();