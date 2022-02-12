import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
});

let sqs = new AWS.SQS();


export const sendSQS = (discID, first, last, email) => {
    const params = {
        MessageAttributes: {
            first: {
                DataType: "String",
                StringValue: first,
            },
            last: {
                DataType: "String",
                StringValue: last,
            },
            email: {
                DataType: "String",
                StringValue: email,
            },
            discordID: {
                DataType: "Number",
                StringValue: `${discID}`,
            },
        },
        MessageBody: "User Login Data",
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/583903076756/TimmySSO",
    };

    sqs.sendMessage(params, function (err, data) {});
};