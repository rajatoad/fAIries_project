const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "SkillTable";

// READ
async function getItem(key) {
  const command = new GetCommand({
    TableName,
    Key: key,
  });
  console.log(key);
  try {
    const data = await documentClient.send(command);
    return data.Item;
  } catch (err) {
    console.error(`Unable to read item. Error: ${err}`);
  }
  return null;
}

async function createItem(item) {
  const command = new PutCommand({
    TableName,
    Item: item,
  });
  try {
    const data = await documentClient.send(command);
    return data;
  } catch (error) {
    console.error("Unable to add item. Error:", JSON.stringify(error, null, 1));
    return null;
  }
}

module.exports = {
  getItem,
  createItem
};
