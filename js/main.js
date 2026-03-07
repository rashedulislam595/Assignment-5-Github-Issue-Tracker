
const issuesContainer = document.getElementById("issue-container");
const issueCont = document.getElementById("issue-count");
const loadingContainer = document.getElementById("loading-container");
let openIssues = [];
let closedIssues = [];

const loadIssue = async() =>{
    loading(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssue(data.data);
}

// loading 
const loading =(status) =>{
    if(status == true){
        loadingContainer.classList.remove("hidden")
    }else{
        loadingContainer.classList.add("hidden")
    }
}

// button active color
const buttonActive = (text) =>{
    

    const allBtn = document.getElementById("all-btn");
    const openBtn = document.getElementById("open-btn");
    const closedBtn = document.getElementById("closed-btn");
    
    if(text == "all"){
        allBtn.classList.add("btn-primary");
        allBtn.classList.remove("text-[#64748B]","bg-[#FFFFFF]")
        openBtn.classList.remove("btn-primary");
        closedBtn.classList.remove("btn-primary");
        loadIssue();
        
    }
    else if(text == "open"){
        issuesContainer.innerHTML = "";
        openBtn.classList.remove("text-[#64748B]" ,"bg-[#FFFFFF]");
        allBtn.classList.remove("btn-primary");
        closedBtn.classList.remove("btn-primary");
        openBtn.classList.add("btn-primary");
        displayIssue(openIssues);
    }else{
        issuesContainer.innerHTML = "";
        closedBtn.classList.remove("text-[#64748B]" ,"bg-[#FFFFFF]");
        allBtn.classList.remove("btn-primary");
        openBtn.classList.remove("btn-primary");
        closedBtn.classList.add("btn-primary");
        issueCont.innerText = 0;
        displayIssue(closedIssues);
    }
}

const displayIssue = (issues) =>{
    issuesContainer.innerHTML = "";
    
    issues.forEach(issue =>{
        let year = issue.createdAt.slice(0,4);
        let date = issue.createdAt.slice(8,10);
        let month = issue.createdAt.slice(5,7);
       
        const issueCard = document.createElement("div");
        issueCard.className = "p-4 rounded-lg shadow-xl";

        issueCard.innerHTML = `
                    <div class="flex justify-between items-center mb-3">
                        <img src="./assets/Open-Status.png" alt="">
                        <h3 class="text-sm font-medium text-[#EF4444] bg-[#FEECEC] py-2 px-8 rounded-full">${issue.priority}</h3>
                    </div>
                    <h2 class="text-[#1F2937] text-lg font-bold mb-2">${issue.title}</h2>
                    <p class="text-[#64748B] line-clamp-2 mb-3">${issue.description}</p>
                    <!-- labels -->
                    <div class="flex gap-1 mb-4">
                        <p
                            class="text-sm font-medium text-[#EF4444] bg-[#FEECEC] py-2 px-4 rounded-full border border-[#FECACA]">
                            <i class="fa-solid fa-bug"></i> ${issue.labels[0]}</p>
                        
                        <p> ${issue.labels[1] ? `<p class=" text-sm font-medium text-[#D97706] bg-[#FFF8DB] py-2 px-5 rounded-full border border-[#FDE68A]"> <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]} </p>`: "" }</p>
                    </div>

                    <!-- author & createdAt -->
                    <div class="p-4 border-t border-[#E4E4E7] text-[#64748B] space-y-2">
                        <p>#<span>1</span> <span>${issue.author}</span></p>
                        <p>${month}/${date}/${year}</p>
                    </div>
        `
        issuesContainer.appendChild(issueCard)
        if(issue.status == "open"){
            issueCard.classList.add("border-t-4","border-[#00A96E]");
            openFilterIssues(issue,issue.id)
        }else{
            issueCard.classList.add("border-t-4","border-[#A855F7]");
            closedFilterIssues(issue,issue.id)
        }
    
    })
    issueCont.innerText = issuesContainer.children.length;
    loading(false)
}
const openFilterIssues = (issues,id) =>{
    const existingItem = openIssues.find(item => item.id == id);
    if(!existingItem){

        openIssues.push(issues)
    }
}
const closedFilterIssues = (issues,id) =>{
    const existingItem = closedIssues.find(item => item.id == id);
    if(!existingItem){

        closedIssues.push(issues)
    }
}

loadIssue();