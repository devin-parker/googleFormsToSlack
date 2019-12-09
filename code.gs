// Webhook goes here - Channel XXX - channel id XXX
var SLACK_WEBHOOK_POST_URL = "WEBHOOK GOES HERE ";

function onSubmit(entry) {

   // Get item submitted
  // event.response = https://developers.google.com/apps-script/reference/forms/form-response
  var responses = entry.response.getItemResponses(); // Gets all item responses contained in a form response, in the same order that the items appear in the form
  
  // Lazy way to turn the email into username for actionable message
  var userName =  entry.response.getRespondentEmail().replace(/@EMAIL.com/g, "");
  
  // Construct Slack message Blocks
  var fields = [
    {
      "type": "mrkdwn",
      "text" : "*field 1*\n @" + userName,
    },
    {
    "type": "mrkdwn",
      "text" : "*field 2*\n" + responses[0].getResponse(), 
    },
    {
    "type": "mrkdwn",
      "text" : "*field 3*\n" + responses[1].getResponse(), // For CheckboxItem questions add .join(), this returns a String[] array containing the responder's choices. 
    },
    {
    "type": "mrkdwn",
      "text" : "*field 4*\n" + responses[2].getResponse(), // String for TextItem question
    }
  ]
  
  var blocks = [
    {
       "type" : "section",
       "fields" : fields
    }
  ];
  
  var payload = {
    "blocks": blocks
  };

  // Build request
  var options = {
    method: "post",
    payload: JSON.stringify(payload)
  };

  // Send to Slack
  UrlFetchApp.fetch(SLACK_WEBHOOK_POST_URL, options);
};
