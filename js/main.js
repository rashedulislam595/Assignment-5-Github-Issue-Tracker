
const issuesContainer = document.getElementById("issue-container");

const loadIssue = async() =>{
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssue(data.data);
}

const displayIssue = (issues) =>{
    issuesContainer.innerHTML = "";

//     {
//     "id": 40,
//     "title": "Implement activity logging",
//     "description": "Add comprehensive activity logs for audit trail and debugging purposes.",
//     "status": "open",
//     "labels": [
//         "enhancement"
//     ],
//     "priority": "medium",
//     "author": "logger_leo",
//     "assignee": "alex_perf",
//     "createdAt": "2024-01-22T14:00:00Z",
//     "updatedAt": "2024-01-22T14:00:00Z"
// }
    
    issues.forEach(issue =>{
        let year = issue.createdAt.slice(0,4);
        let date = issue.createdAt.slice(8,10);
        let month = issue.createdAt.slice(5,7);
       
        console.log(issue.status)
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
            issueCard.classList.add("border-t-4","border-[#00A96E]")
        }else{
            issueCard.classList.add("border-t-4","border-[#A855F7]")
        }
    
    })
}

loadIssue();