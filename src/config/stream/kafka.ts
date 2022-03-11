import { Admin, Consumer, Kafka, Producer } from "kafkajs";
import config from '../env/index';

var producer: Producer;
var consumer: Consumer;

/**
 * @export
 * @param {express.Application} app
 */
 export async function init(topics: string[]): Promise<void> {

    const kafka =  new Kafka({
        clientId: config.kafka.CLIENT_ID,
        brokers: [config.kafka.BROKER],
      });
    const admin = kafka.admin();
    producer = kafka.producer();
    consumer = kafka.consumer({ groupId: config.kafka.GROUP_ID });

    await producer.connect();
    await consumer.connect();
    await admin.connect();

    await createTopics(admin, topics);
    
    return;
 }

 async function createTopics(admin: Admin, topics: string[]){

    let topicsConfig = topics.map( item => {
        return {
            topic: item,
            numPartitions: 1,     // default: 1
            replicationFactor: 1, // default: 1
        }
    });

    await admin.createTopics({
        topics: topicsConfig
    });
 }

/**
 * @export
 * @param {express.Application} app
 */
 export async function send(topic: string, payload: any): Promise<void> {
    await producer.send({
        topic: topic,
        messages: [
            { value: payload },
        ],
      })
 }

 /**
 * @export
 * @param {express.Application} app
 */
  export async function suscribe(topics: string[], done: any) {

    topics.forEach(async(topic) => {
        await consumer.subscribe({ topic: topic, fromBeginning: true })    
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
          done(topic, partition, message);
      },
    })
 }