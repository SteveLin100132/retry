# 0.0.1 (2021-01-28)

## Feature

* ProducerAdpater: 提供拋送者介面，實作介面中的```send```方法，並在送出資料時使用```publish```方法，即可在拋送資料失敗時，重新拋送
* ProducerAdpater: 超出失敗上限後將資料備份至特定路徑

# 0.0.2(2021~)

## Feature

* RetryTemplate: 埋入API，提供重拋失敗的backup資料手動上拋的功能