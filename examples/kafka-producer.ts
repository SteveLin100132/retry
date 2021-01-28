/**
 * 專案名稱： @wistroni40/retry
 * 部門代號： ML8100
 * 檔案說明： Kafka Producer重拋範例
 * @CREATE Wed Jan 27 2021 下午2:11:27
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { HighLevelProducer, KafkaClient, ProduceRequest } from 'kafka-node';
import { v4 as uuidv4 } from 'uuid';
import { ProducerAdapter, RetryOption } from './../lib';

/**
 * -----------------------------------------------------------------------------
 * Custom Producer
 * -----------------------------------------------------------------------------
 */

/**
 * Kafka Producer轉接器
 */
class MyProducer extends ProducerAdapter<HighLevelProducer> {
  /**
   * @param kafkaProducer Kafka Producer
   * @param options       重拋配置
   */
  constructor(
    protected kafkaProducer: HighLevelProducer,
    protected options?: RetryOption
  ) {
    super(kafkaProducer, options);
  }

  /**
   * 發送數據
   *
   * @method public
   * @param payload  要拋送的數據 
   * @param callback 拋送後的回乎函數
   */
  public send(
    payload: ProduceRequest[],
    callback: (error: any, result: any) => void
  ): void {
    this.kafkaProducer.send(payload, (err, res) => callback(err, res));
  }
}

/**
 * -----------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------
 */

const kafkaHost = 'localhost:9092,localhost:9092,localhost:9092';
const topic = 'input.your.own.topic';

/**
 * -----------------------------------------------------------------------------
 * Kafka Client and Producer
 * -----------------------------------------------------------------------------
 */

const kafkaClient = new KafkaClient({
  kafkaHost,
  clientId: uuidv4(),
  connectTimeout: 60000,
  requestTimeout: 60000,
  connectRetryOptions: {
    retries: 5,
    factor: 0,
    minTimeout: 1000,
    maxTimeout: 1000,
    randomize: false,
  },
});

const producer = new HighLevelProducer(kafkaClient, {
  requireAcks: 1,
  ackTimeoutMs: 100,
});

const myProducer = new MyProducer(producer, { count: 3, interval: 500 });

/**
 * -----------------------------------------------------------------------------
 * Produce
 * -----------------------------------------------------------------------------
 */

producer.on('ready', () => {
  console.log('producer ready');

  setTimeout(async () => {
    console.log('start send payload');
    const payload = [
      {
        topic,
        messages: JSON.stringify({ evt_dt: new Date().getTime() }),
      },
    ];

    myProducer.publish(payload);
  }, 2000);
});
