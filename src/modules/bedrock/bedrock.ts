import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

export class Bedrock {
  static contentFor = (prompt) => {
    return new Promise(async (resolve, reject) => {
      try {
        const AWS_REGION = "us-east-1";

        // Create a new Bedrock Runtime client instance.
        // ⚠️ WARNING: Never commit your credentials to repo, store in .env file or similar
        const client = new BedrockRuntimeClient({
          region: AWS_REGION,
          credentials: {
            accessKeyId: "<IAM-AccessKey-ID>",
            secretAccessKey: "<IAM-Secret-AccessKey>",
          },
        });

        // Create input parameters
        const input = {
          modelId: "amazon.titan-text-lite-v1",
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify({
            inputText: prompt,
            textGenerationConfig: {
              maxTokenCount: 512,
            },
          }),
        };

        const command = new InvokeModelCommand(input);

        // Send request
        console.log("Sending Bedrock Request...");
        const apiResponse = await client.send(command);

        // Decode and return the response(s)
        const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
        /** @type {ResponseBody} */
        const responseBody = JSON.parse(decodedResponseBody);
        resolve(responseBody);
      } catch (error) {
        reject(error);
      }
    });
  };
}
