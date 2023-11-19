## ローカル環境構築手順

1. ルートディレクトリに`.env`ファイル を作成し、以下の項目を設定する。

```
MONGODB_URL=mongodb+srv://<ユーザー名>:<パスワード>@<クラスター名>.zrggmf1.mongodb.net/?retryWrites=true&w=majority

SECRET_KEY=YOU_SECRET_KEY

TOKEN_SECRET_KEY=YOU_TOKEN_SECRET_KEY
```

\*MongoDB の登録～接続情報の取得は以下 URL を参考にしてください

- https://reffect.co.jp/node-js/mongodb-cloud/

\*SECRET_KEY, TOKEN_SECRET_KEY は自由な文字列を指定してください

2. `$ npm install`
3. `$ npm start`
4. コンソール画面に`Server starting...`と表示されればローカル起動完了
