# @wistroni40/retry

# Install

```
npm i @wistroni40/retry --save
```

# Table of Contents

- [Quickstart](#Quickstart)
- [Feature](#Feature)
- [API](#API)
  - [ProducerAdapter](#ProducerAdapter)
  - [RetryOption](#RetryOption)
  - [Producer](#Producer)
  - [RetryTemplate](#RetryTemplate)
  - [Retry](#Retry)

# Quickstart

[Full Example](https://github.com/SteveLin100132/-wistroni40-retry/blob/master/examples/kafka-producer.ts)

```typescript
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

const myProducer = new MyProducer(PRODUCER);
const payload = { data: 100 };
myProducer.publish(payload);
```

# Feature

* 提供拋送者介面，實作介面中的```send```方法，並在送出資料時使用```publish```方法，即可在拋送資料失敗時，重新拋送
* 超出失敗上限後將資料備份至特定路徑

# API

## ***ProducerAdapter***

**Abstract Class**，拋送者轉接器

### constructor

ProducerAdapter的建構值

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
producer | T | Required | ```undefined``` | 任何拋送數據的物件
options | RetryOption | Optional | [Example](#RetryOptions) | 重拋配置，項目可[參考](#RetryOptions)

### Methods

#### publish

資料上拋方法，拋送失敗會自動嘗試重新拋送

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
payload | any | Required | ```undefined``` | 要送出的資料

#### ***send***

**Abstract Method**，須實作此方法，資料上拋，但失敗不會自動重新拋送

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
payload | any | Required | ```undefined``` | 要送出的資料
callback | (error: any, result: any) => void | Required | ```undefined``` | 送出資料後的回乎函數

## **RetryOptions**

**Interface**，重拋配置項目

### Properties

Property | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
count | number | Optional | ```3``` | 送出失敗嘗試重拋的上限次數
interval | number | Optional | ```5000``` | 嘗試重新拋送的時間間距，單位ms
backupDir | string | Optional | ```'./backup'``` | 重拋失敗後的資料保存路徑

## **Producer**

**Interface**，拋送者介面

### Methods

#### ***send***

須實作此方法，資料上拋

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
payload | any | Required | ```undefined``` | 要送出的資料
callback | (error: any, result: any) => void | Required | ```undefined``` | 送出資料後的回乎函數

## ***RetryTemplate***

**Abstract Class**，重拋機制範本

### constructor

RetryTemplate的建構值

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
producer | Producer | Required | ```undefined``` | 拋送者
options | RetryOption | Optional | [Example](#RetryOptions) | 重拋配置，項目可[參考](#RetryOptions)

### Methods

#### updateOptions

更新重拋配置

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
options | RetryOption | Required | [Example](#RetryOptions) | 重拋配置，項目可[參考](#RetryOptions)

#### ***retry***

**Abstract Method**，須實作此方法，嘗試重新拋送資料

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
payload | T | Required | ```undefined``` | 要送出的資料

## **Retry**

**Class extends from RetryTemplate**，重拋機制

### Methods

#### retry

嘗試重新拋送資料

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
payload | T | Required | ```undefined``` | 要送出的資料

