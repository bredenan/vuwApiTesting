// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphOnedriveEndpoint: "https://graph.microsoft.com/v1.0/me/drive/recent",
    graphGroupsEndpoint: "https://graph.microsoft.com/v1.0/me/transitiveMemberOf/microsoft.graph.group?$count=true",
    graphTeamsEndpoint: "https://graph.microsoft.com/v1.0/me/joinedTeams",
    graphPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value"
    
};
