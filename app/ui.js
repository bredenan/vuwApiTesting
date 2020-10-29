// Last modified: 2020/10/29 15:45:13

// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const photoButton = document.getElementById("seePhoto");
const photoDiv = document.getElementById("photo-div");

function showWelcomeMessage(account) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${account.username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    console.log(data);

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (data.value.length < 1) {
            alert("Your mailbox is empty!")
        } else {
            const tabList = document.getElementById("list-tab");
            tabList.innerHTML = ''; // clear tabList at each readMail call
            const tabContent = document.getElementById("nav-tabContent");

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    } else if (endpoint === graphConfig.graphOnedriveEndpoint) {
        if (data.value.length < 1) {
            alert("Error getting recent documents!")
        } else {
            const tabList = document.getElementById("list-tab");
            tabList.innerHTML = ''; // clear tabList at each readMail call
            const tabContent = document.getElementById("nav-tabContent");

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    // const listItem = document.createElement("a");
                    // listItem.setAttribute("class", "list-group-item list-group-item-action")
                    // listItem.setAttribute("id", "list" + i + "list")
                    // listItem.setAttribute("data-toggle", "list")
                    // listItem.setAttribute("href", "#list" + i)
                    // listItem.setAttribute("role", "tab")
                    // listItem.setAttribute("aria-controls", i)
                    // listItem.innerHTML = d.name;
                    // tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong>Name: " + d.name + "</strong><br>last modified: " + d.lastModifiedDateTime + "<br>Size: " + d.size + "<br>";
                    contentItem.innerHTML += 'Filetype: <span class="ms-Icon ms-Icon--WordLogo _1NTwdglUKLpHkf8sgkCoVl ms-svg-Icon" role="presentation" style="display: inline-block;"></span><em class=\"result_flag flag_pdf\">pdf</em>' + d.file.mimeType;
                    contentItem.innerHTML += "<br><a href='" + d.webUrl + "'>Link</a><br>";
                    tabList.appendChild(contentItem); 
                }
            });
        }
    } else {
        console.log("Unknown endpoint:" + endpoint);
        // try {
        //     console.log(JSON.stringify(data));
        // } catch (e) {
        //     console.error("Error JSON parsing data");
        //     console.error(e);
        // }
    }
}