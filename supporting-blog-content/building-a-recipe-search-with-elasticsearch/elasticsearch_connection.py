# import yaml
import os
from dotenv import load_dotenv
from elasticsearch import Elasticsearch, AsyncElasticsearch

load_dotenv()

elastic_user = os.getenv('ES_USER')

class ElasticsearchConnection:
    elastic_user = os.getenv('ES_USER')
    elastic_password = os.getenv('ES_PASSWORD')
    elastic_endpoint = os.getenv("ES_ENDPOINT")
    url = f"https://{elastic_user}:{elastic_password}@{elastic_endpoint}:9200"

    # def __init__(self, config_file="config.yml"):
    #     with open(config_file, "r") as f:
    #         config = yaml.safe_load(f)
    #         self.client = Elasticsearch(
    #             cloud_id=config["cloud_id"], api_key=config["api_key"]
    #         )
            
    def __init__(self):
        self.client = Elasticsearch( self.__class__.url, 
                                     ca_certs = "./http_ca.crt", 
                                     verify_certs = True)
        print(self.client.info())

    def get_client(self):
        return self.client

    def get_async_client(self):
        # with open("config.yml", "r") as f:
        #     config = yaml.safe_load(f)
            # self.client = AsyncElasticsearch(
            #     cloud_id=config["cloud_id"],
            #     api_key=config["api_key"],
            #     request_timeout=240,
            # )
        self.client = AsyncElasticsearch( self.__class__.url, 
                                          ca_certs = "./http_ca.crt", 
                                          verify_certs = True,
                                          request_timeout=240)            
        return self.client
