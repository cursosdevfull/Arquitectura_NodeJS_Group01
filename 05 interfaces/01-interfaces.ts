interface SQSConfig {
  Region: string;
  DelaySeconds: number;
  Url: string;
}

const sqsConfig: SQSConfig = {
  Region: "us-east-1",
  DelaySeconds: 10,
  Url: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
};

console.log("url", sqsConfig.Url);
console.log("region", sqsConfig.Region);
console.log("delay seconds", sqsConfig.DelaySeconds);
