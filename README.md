# AIとあそぶ どうぶつタワーバトル(もどき)
otanilab 2019 project

## ロードマップ
- [ ] 5/23 ゲーム部分完成
- [ ] 6/5 AI部分完成
- [ ] 6/7 マスターアップ

## 使用ライブラリ
- Node.js(フレームワーク)
- matter.js(物理演算エンジン)
- percel(Node.jsアプリをhtml向けにデプロイするビルドツール)

## 開発環境の構築〜動作チェック
開発には Node.js のインストールが必要です。
https://nodejs.org/ja/

#### 1. リポジトリをcloneする
`git clone https://github.com/SoraY677/YFE_DTB.git`

#### 2. cloneしたリポジトリ内で`npm install`を実行
`npm install`

#### 3. percelを実行し、ビルド・サーバ立ち上げ
`npx parcel index.html`

#### 4. 動作確認
任意のブラウザで`http://localhost:1234`に接続
