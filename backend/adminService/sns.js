const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const sns = new SNSClient({
  region: "us-west-1"
});

const notify = async (msg) => {
  try {
    await sns.send(new PublishCommand({
      TopicArn: process.env.SNS_TOPIC,
      Message: msg
    }));
    console.log("SNS message sent");
  } catch (e) {
    console.error("SNS error", e);
  }
};

module.exports = notify;

