## Amon Kikuchi Portfolio (honekiti.github.io)

AI/データサイエンスとフロントエンド開発を軸にしたポートフォリオサイトです。ヒーロー/自己紹介/スキル/プロジェクト/コンタクトの各セクションで構成し、モダンなUIとアニメーションを採用しています。

### 特長
- モダンなタイポグラフィ (Inter, JetBrains Mono)
- ダーク寄りの配色とアクセントカラー、スムーズなスクロール演出
- レスポンシブ対応 (Bootstrap 5)
- AOS によるスクロールアニメーション
- プロジェクトのコード/デモへのリンクをカードで見やすく表示

### 技術スタック
- HTML5 / CSS3 / JavaScript
- Bootstrap 5, Font Awesome
- Google Fonts (Inter, JetBrains Mono)
- AOS (Animate On Scroll)

## ローカルで確認する
macOS 想定。任意の静的サーバーでOKです。

- 方法A: Pythonの簡易サーバー
```bash
cd /Users/amonkikuchi/dev/Portforio/honekiti.github.io
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

- 方法B: VS Code Live Server 拡張
	1) 拡張機能「Live Server」をインストール
	2) `index.html` を開き「Go Live」をクリック

## ディレクトリ構成
```
index.html
css/
	styles.css
js/
	scripts.js
assets/
	favicon.ico, icon.ico
	img/
		myportofolio.png, BTC_img.jpg, finance.jpg ほか
```

## カスタマイズのポイント
- 文言・リンク: `index.html`
- 色/余白/アニメーション調整: `css/styles.css`
- ナビ挙動/スクロール/初期化処理: `js/scripts.js`
- 画像やアイコン: `assets/` 配下

## デプロイ (GitHub Pages)
このリポジトリ名は `honekiti.github.io` のため、`main` に push すると自動で公開されます。
- GitHub の Settings > Pages でソースが「Deploy from a branch / main / root」になっているか確認
- 公開URL: https://honekiti.github.io

## クレジット / ライセンス
- Bootstrap 5 (MIT)
- Start Bootstrap - Grayscale テンプレート由来コンポーネント (MIT)
- Font Awesome Free (各種ライセンスに準拠)
- AOS (MIT)
- Google Fonts (各フォントのライセンスに準拠)

本リポジトリ内のオリジナルコード/コンテンツの著作権は作者に帰属します。

## 連絡先
- GitHub: https://github.com/honekiti
- Email: amon20021121@gmail.com
