// Helper function to call MS Graph API endpoint 
// using authorization bearer token scheme
function callMSGraph(endpoint, token, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());
    console.log('Endpoint: ' + endpoint);

    fetch(endpoint, options)
        .then(response => { console.log(response); return response.json(); })
        .then(response => callback(response, endpoint))
        .catch(error => { console.error(error); });
}
