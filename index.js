const {
    buildNumber,
    buildStarted,
    buildStatus,
    buildLink,

    commitAuthorName,
    commitAuthorAvatar,
    commitBranch,
    commitMessage,
    commitLink,
    commitSha,

    repo,

    webhook,
    debug
} = require('./args').parse();
const request = require('request');

const buildStatusFormatted = buildStatus.charAt(0).toUpperCase() + buildStatus.slice(1);

const message = {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": `Build #${buildNumber} ${buildStatusFormatted}`,
    "themeColor": "0078D7",
    "title": `Build #${buildNumber} ${buildStatusFormatted}`,
    "sections": [
        {
            "activityTitle": commitAuthorName,
            "activitySubtitle": new Date(parseInt(buildStarted) * 1000).toLocaleString(),
            "activityImage": commitAuthorAvatar,
            "facts": [
                {
                    "name": "Status:",
                    "value": `**${buildStatusFormatted}**`
                },
                {
                    "name": "Repository:",
                    "value": repo
                },
                {
                    "name": "Branch:",
                    "value": commitBranch
                },
                {
                    "name": "Commit:",
                    "value": `[${commitSha.substring(0, 7)}](${commitLink})`
                }
            ],
            "text": commitMessage
        }
    ],
    "potentialAction": [
        {
            "@type": "OpenUri",
            "name": "View Build",
            "targets": [
                { "os": "default", "uri": buildLink }
            ]
        },
        {
            "@type": "OpenUri",
            "name": "View Commit",
            "targets": [
                { "os": "default", "uri": commitLink }
            ]
        }
    ]
};

if (debug) {
    console.log('POSTing data:')
    console.log(JSON.stringify(message, null, 2));
}

request({
    method: 'post',
    uri: webhook,
    json: message,
}, (error, response, body) => {
    if (response.statusCode !== 200) {
        console.log('Error');
        console.log(response.statusCode, body);
    }
}); 