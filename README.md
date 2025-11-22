# 🏖️ Holihack | 2026 請假攻略 & 智慧旅遊計算機

這是一個協助上班族規劃 2026 年（民國 115 年）連假的靜態網頁工具。本網站集成了請假計算、機票比價、行程規劃、票券購買、網路、以及航班延誤索賠等所有旅遊剛需。

🔴 **Live Demo (線上試用)**: [https://holihack.com/](https://holihack.com/)

## ✨ 核心功能與變現 (Features & Monetization)

* **📅 連假最佳化計算**：自動演算 2026 年國定假日的最佳請假組合，快速找到 **「請 4 休 16 天」** 等神級攻略。
* **✈️ 機票比價整合**：
    * 整合 Skyscanner Deep Link，自動帶入日期與城市，進行即時機票比價。
* **🛒 一站式旅遊購買**：
    * **活動票券**：Klook 專屬分潤連結。
    * **上網服務**：Saily eSIM 專屬分潤連結。
    * **權益保障**：AirHelp 航班延誤/取消索賠分潤連結。
* **📊 追蹤系統完備**：網站內建 GA4 追蹤碼、GTM 容器，並提交 `ads.txt` 及 `sitemap.xml`，為商業營運打下基礎。
* **📲 社群分享功能**：一鍵分享攻略至 LINE、Threads、Instagram。

## 💡 網站深度文章 (SEO & Authority)

為符合 Google AdSense 及 SEO 深度內容需求，網站包含以下 5 篇核心文章：

* **春節 16 天長假攻略** (`guide-cny.html`)
* **機票飯店省錢術** (`guide-flights.html`)
* **2026 最適合休假分析** (`guide-bestyear.html`)
* **特休勞基法注意事項** (`guide-laborlaw.html`)
* **GA4 點擊追蹤教學** (`guide-ga4-track.html`)

## 🛠️ 技術棧 (Tech Stack)

* **Core**: HTML5, CSS3, JavaScript (Vanilla ES6+)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN version)
* **Icons**: [Font Awesome 6](https://fontawesome.com/)
* **Analytics**: Google Analytics 4 (GA4), Google Tag Manager (GTM)

## ⚙️ 如何在本地端執行 (Configuration)

1.  Clone 此專案到你的電腦：
    ```bash
    git clone [https://github.com/heywoosa/heywoosa.github.io.git](https://github.com/heywoosa/heywoosa.github.io.git)
    ```
2.  在瀏覽器開啟 `index.html` 即可。
3.  **變現設定**：請在 `script.js` 檔案最上方，填入你的 Skyscanner 分潤 ID。

## 📂 專案結構 (Project Structure)

```text
├── index.html          # 核心頁面 (主計算機)
├── privacy.html        # 隱私權政策 (AdSense 必備)
├── script.js           # 邏輯核心 (演算法、連結生成、UI 動態效果)
├── style.css           # 自定義樣式
├── ads.txt             # Google 廣告驗證檔案
├── sitemap.xml         # 網站地圖 (SEO 提交用)
├── guide-cny.html      # SEO 文章 1
├── guide-flights.html  # SEO 文章 2
├── guide-bestyear.html # SEO 文章 3
├── guide-laborlaw.html # SEO 文章 4
├── guide-ga4-track.html# SEO 文章 5
└── README.md           # 專案說明文件