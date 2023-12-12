const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
// const { Configuration, OpenAIApi } = require("openai");
const { OpenAI } = require("openai");

const elasticsearch_url = process.env.ELASTICSEARCH_URL;

elasticsearchClient = null;

if (elasticsearch_url) {
  console.log(`Connecting to Elasticsearch: ${process.env.ELASTICSEARCH_URL}`);

  elasticsearchClient = new Client ( {
    node: process.env.ELASTICSEARCH_URL,
    auth: { 
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
     }, 
     tls: {
      ca: fs.readFileSync('./http_ca.crt'),
      rejectUnauthorized: true
     }
  });

  elasticsearchClient.ping()
  .then(res => console.log('connection success', res))
  .catch(err => console.error('wrong connection', err));

} else {
  console.log(`Connecting to Elastic Cloud: ${process.env.ELASTIC_CLOUD_ID}`);

  elasticsearchClient = new Client({
    cloud: {
      id: process.env.ELASTIC_CLOUD_ID,
    },
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    },
  });  
}


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  getElasticsearchClient: () => elasticsearchClient,
  getOpenAIClient: () => openai,
  // Global variables
  // Modify these if you want to use a different file, index or model
  FILE: "sample_data/medicare.json",
  INDEX: "openai-integration",
  MODEL: "text-embedding-ada-002",
};
