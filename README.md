# 🏖️ 2026 請假攻略 & 機票比價計算機 (2026 Leave Calculator)

這是一個協助上班族規劃 2026 年（民國 115 年）連假的靜態網頁工具。使用者只需輸入剩餘的特休天數，系統即可自動計算出 CP 值最高的請假攻略（例如：春節請 4 天休 16 天），並整合 Skyscanner 機票比價功能，一鍵查詢該時段的機票價格。

🔴 **Live Demo (線上試用)**: [https://heywoosa.github.io/](https://heywoosa.github.io/)

## ✨ 功能特色 (Features)

* **連假最佳化計算**：自動演算 2026 年各大節日（元旦、春節、清明、端午、中秋、國慶）的最佳請假組合。
* **機票比價整合**：
    * 整合 Skyscanner Deep Link。
    * 自動帶入「出發地」、「目的地機場代碼 (IATA)」與「連假日期區間」。
    * 支援 Affiliate ID (聯盟行銷) 參數串接。
* **旅遊資訊查詢**：提供熱門國家（日、韓、泰、歐美）的飛行時間、電壓、簽證與建議旅遊天數。
* **社群分享功能**：
    * 一鍵分享攻略至 LINE、Threads。
    * 支援 Instagram 複製文字並喚起 App。
* **商業變現機制**：
    * 內建 Google AdSense 廣告版位。
    * 內建 Skyscanner / Travelpayouts 分潤連結機制。
* **響應式設計 (RWD)**：使用 Tailwind CSS，完美支援手機與電腦版面。

## 🛠️ 技術棧 (Tech Stack)

* **Core**: HTML5, CSS3, JavaScript (ES6+)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN version)
* **Icons**: [Font Awesome 6](https://fontawesome.com/)
* **Analytics**: Google Analytics 4 (GA4), Google Tag Manager (GTM)
* **Monetization**: Google AdSense

## 🚀 如何在本地端執行 (How to run locally)

1.  Clone 此專案到你的電腦：
    ```bash
    git clone [https://github.com/heywoosa/heywoosa.github.io.git](https://github.com/heywoosa/heywoosa.github.io.git)
    ```
2.  直接使用瀏覽器開啟 `index.html` 即可。

## ⚙️ 設定與客製化 (Configuration)

若您想複製此專案並修改為自己的版本，請注意以下設定：

### 1. 修改機票分潤 ID
打開 `script.js` 最上方：
```javascript
const skyscannerAffiliateId = "YOUR_ID"; // 填入你的 Affiliate ID


2. 替換追蹤代碼
打開 index.html 的 <head> 區塊，替換以下 ID：

Google Analytics: 搜尋 G-XXXXXXXXXX 並替換。

Google AdSense: 搜尋 ca-pub-XXXXXXXXXX 並替換。

📂 專案結構
├── index.html      # 主頁面 (包含 UI 結構、SEO 內容、GA4/GTM 代碼)
├── privacy.html    # 隱私權政策 (AdSense 必備)
├── script.js       # 核心邏輯 (請假演算法、機票連結生成、分享功能)
├── style.css       # 自定義樣式與動畫
├── ads.txt         # Google AdSense 驗證檔案
└── README.md       # 專案說明文件

📝 License
此專案僅供學習與個人使用
Made with ❤️ by Heywoosa