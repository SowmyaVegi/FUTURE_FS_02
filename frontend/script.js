const API = "http://localhost:5000/api/leads";

let allLeads = [];

/* Load Leads */

async function loadLeads() {

    try {

        const response = await fetch(API);

        const leads = await response.json();

        allLeads = leads;

        displayLeads(leads);

        updateCards(leads);

    } catch (error) {

        console.log(error);

    }

}

/* Display Leads */

function displayLeads(leads) {

    const table =
    document.getElementById("leadTable");

    table.innerHTML = "";

    leads.forEach((lead) => {

        table.innerHTML += `
        <tr>

        <td>${lead.name || ""}</td>

        <td>${lead.email || ""}</td>

        <td>${lead.phone || ""}</td>

        <td>${lead.company || ""}</td>

        <td>${lead.status || "New"}</td>

        <td>

        <button
        class="edit-btn"
        onclick="editLead('${lead._id}')">
        Edit
        </button>

        <button
        class="delete-btn"
        onclick="deleteLead('${lead._id}')">
        Delete
        </button>

        </td>

        </tr>
        `;

    });

}

/* Add Lead */

async function addLead() {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    const company =
    document.getElementById("company").value;

    const source =
    document.getElementById("source").value;

    const status =
    document.getElementById("status").value;

    if (!name || !email) {

        alert("Please enter Name and Email");

        return;
    }

    try {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,
                email,
                phone,
                company,
                source,
                status

            })

        });

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("company").value = "";
        document.getElementById("source").value = "";
        document.getElementById("status").value = "New";

        loadLeads();

    } catch (error) {

        console.log(error);

    }

}

/* Delete Lead */

async function deleteLead(id) {

    const confirmDelete =
    confirm("Delete this lead?");

    if (!confirmDelete) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadLeads();

}

/* Edit Lead */

async function editLead(id) {

    const lead =
    allLeads.find(
        l => l._id === id
    );

    const name =
    prompt("Name", lead.name);

    const email =
    prompt("Email", lead.email);

    const phone =
    prompt("Phone", lead.phone);

    const company =
    prompt("Company", lead.company);

    const status =
    prompt(
        "Status (New, Contacted, Qualified, Converted)",
        lead.status
    );

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            email,
            phone,
            company,
            status

        })

    });

    loadLeads();

}

/* Search */

function searchLead() {

    const searchValue =
    document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered =
    allLeads.filter(lead =>

        (lead.name || "")
        .toLowerCase()
        .includes(searchValue)

    );

    displayLeads(filtered);

}

/* Dashboard Cards */

function updateCards(leads) {

    document
    .getElementById("totalLeads")
    .innerText =
    leads.length;

    document
    .getElementById("newLeads")
    .innerText =
    leads.filter(
        l => l.status === "New"
    ).length;

    document
    .getElementById("contactedLeads")
    .innerText =
    leads.filter(
        l => l.status === "Contacted"
    ).length;

    document
    .getElementById("convertedLeads")
    .innerText =
    leads.filter(
        l => l.status === "Converted"
    ).length;

}

/* Initial Load */

loadLeads();