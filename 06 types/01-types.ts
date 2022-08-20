type SNSConfig = { TopicArn: string; Region: string };

const snsConfig: SNSConfig = {
  TopicArn: "arn:aws:sns:us-east-1:123456789012:MyTopic",
  Region: "us-east-1",
};

type PhoneUSA = { code: string; number: string };

type Phone = string | number | PhoneUSA;

const phoneNumber: Phone = "1234567890";
const phoneNumber2: Phone = 1234567890;
const phoneNumber3: Phone = { code: "+1", number: "1234567890" };
