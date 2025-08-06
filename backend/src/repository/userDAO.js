const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand, // Add ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "UsersTable";


// Find user by username and password (not partition key)
async function findUserByUsernameAndPassword(username, password) {
  console.log(`Finding user with username: ${username} and password: ${password}`);
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#username = :username AND #password = :password",
    ExpressionAttributeNames: {
      "#username": "username",
      "#password": "password",
    },
    ExpressionAttributeValues: {
      ":username": username,
      ":password": password,
    },
    Limit: 1, // Only need one match
  });

  try {
    const data = await documentClient.send(command);
    return data.Items && data.Items.length > 0 ? data.Items[0] : null;
  } catch (err) {
    console.error(`Unable to scan for user. Error: ${err}`);
    return null;
  }
}

async function getItem(key) {
  const command = new GetCommand({
    TableName,
    Key: key,
    
    });

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
  createItem,
  findUserByUsernameAndPassword, 
};