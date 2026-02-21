const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const client = new SNSClient({ region: "us-west-1" });

async function notify(message) {
  const params = {
    Message: message,
    TopicArn: "arn:aws:sns:us-west-1:975050024946:hari-sns-streamingapp"
  };

  const command = new PublishCommand(params);
  await client.send(command);
}

module.exports = notify;
