const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require('uuid');

const client = new DynamoDBClient({ region: "us-east-1" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "JournalTable";

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

async function getItemsByUserId(userId) {
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
      ":user_id": userId,
    },
    Limit: 1, // Only need one match
  });

  try {
    console.log(userId);
    const data = await documentClient.send(command);
    return data.Items[0];
  } catch (err) {
    console.error(`Unable to query items by user ID. Error: ${err}`);
    return null;
  }
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

async function updateItem(item) {
  const command = new UpdateCommand({
    TableName,
    Key: { journal_id: item.journal_id },
    UpdateExpression: "set entries = :entries",
    ExpressionAttributeValues: {
      ":entries": item.entries,
    },
    ReturnValues: "ALL_NEW",
  });
  try {
    const data = await documentClient.send(command);
    return data.Attributes;
  } catch (error) {
    console.error("Unable to update item. Error:", JSON.stringify(error, null, 1));
    return null;
  }
}

module.exports = {
  getItem,
  createItem,
  getItemsByUserId,
  updateItem
};
