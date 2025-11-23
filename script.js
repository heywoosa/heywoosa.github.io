// ===============================================
// 1. 核心資料與設定
// ===============================================

// 2026 年國定假日數據 (起始日, 結束日, 名稱, 請假天數, 總天數)
// 這裡只列舉了主要的連假機會
const holidays2026 = [
    // 元旦 (請1休4)
    { name: "元旦", start: "2026-01-01", end: "2026-01-04", targetDays: 4, type: 'long' },
    // 春節 (請4休16)
    { name: "春節 & 228 連休", start: "2026-02-14", end: "2026-03-01", targetDays: 16, type: 'super' },
    // 清明節 (請3休9)
    { name: "清明節", start: "2026-04-03", end: "2026-04-12", targetDays: 9, type: 'long' },
    // 勞動節 (請1休4) - 假設勞工適用
    { name: "勞動節", start: "2026-05-01", end: "2026-05-04", targetDays: 4, type: 'short' },
    // 端午節 (請3休8)
    { name: "端午節", start: "2026-06-19", end: "2026-06-28", targetDays: 8, type: 'long' },
    // 中秋節 (請2休5)
    { name: "中秋節", start: "2026-10-02", end: "2026-10-06", targetDays: 5, type: 'short' },
    // 國慶日 (請3休9)
    { name: "國慶日", start: "2026-10-09", end: "2026-10-18", targetDays: 9, type: 'long' },
];

// 旅遊目的地資料 (包含機票連結參數和圖片版權)
const flightData = {
    // 預設 (未選)
    'none': { 
        name: '未選擇目的地', 
        currency: 'TWD', 
        link: '', 
        klook: 'https://www.klook.com/zh-TW/', 
        image: 'https://images.unsplash.com/photo-1517400508544-7f830d17676e?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by Annie Spratt / Unsplash',
        airport: '' 
    },
    // 東京
    'japan-tokyo': { 
        name: '日本 東京 (NRT)', 
        currency: 'JPY', 
        link: 'https://www.skyscanner.com.tw/transport/flights/tpe/nrt/{startDate}/{endDate}', 
        klook: 'https://www.klook.com/zh-TW/city/2-tokyo/', 
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by David Rangel / Unsplash',
        airport: 'NRT' 
    },
    // 大阪
    'japan-osaka': { 
        name: '日本 大阪 (KIX)', 
        currency: 'JPY', 
        link: 'https://www.skyscanner.com.tw/transport/flights/tpe/kix/{startDate}/{endDate}', 
        klook: 'https://www.klook.com/zh-TW/city/40-osaka/', 
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by Yu Kato / Unsplash',
        airport: 'KIX'
    },
    // 泰國
    'thailand': { 
        name: '泰國 曼谷 (BKK)', 
        currency: 'THB', 
        link: 'https://www.skyscanner.com.tw/transport/flights/tpe/bkk/{startDate}/{endDate}', 
        klook: 'https://www.klook.com/zh-TW/city/16-bangkok/', 
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d58?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by David Dvoracek / Unsplash',
        airport: 'BKK' 
    },
    // 歐洲 巴黎
    'europe-paris': { 
        name: '歐洲 巴黎 (CDG)', 
        currency: 'EUR', 
        link: 'https://www.skyscanner.com.tw/transport/flights/tpe/cdg/{startDate}/{endDate}', 
        klook: 'https://www.klook.com/zh-TW/city/7-paris/', 
        image: 'https://images.unsplash.com/photo-1540306198904-20993510526e?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by Leon Saurant / Unsplash',
        airport: 'CDG'
    },
};

// ===============================================
// 2. 輔助函式 (日期處理)
// ===============================================

/**
 * 將日期字串格式化為 Skyscanner 要求的 YYMMDD 格式 (例如: 2026-01-01 -> 260101)
 * @param {string} dateString - YYYY-MM-DD
 * @returns {string} YYMMDD
 */
function formatToSkyscannerDate(dateString) {
    const parts = dateString.split('-');
    return parts[0].substring(2) + parts[1] + parts[2];
}

/**
 * 取得指定範圍內需要請假的天數
 * @param {string} start - 開始日期 (YYYY-MM-DD)
 * @param {string} end - 結束日期 (YYYY-MM-DD)
 * @returns {number} 需要請假的平日天數
 */
function getRequiredLeaveDays(start, end) {
    let requiredDays = 0;
    let currentDate = new Date(start);
    const endDate = new Date(end);

    // Vercel 雲端環境是 UTC+0，因此日期比較需要考慮時區問題
    // 為了簡化，這裡直接計算範圍內的平日天數 (Mon-Fri)
    
    // 2026 春節彈性補班日（假設已排除在國定假日外）
    // 2026年沒有明確的補班日，主要依賴前後連休
    
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // 0=日, 1=一, ..., 6=六
        
        // 排除週末 (週六和週日)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // 檢查是否是國定假日 (假設 holidays2026 已經處理了放假細節)
            // 這裡直接計算範圍內的總工作日
            requiredDays++; 
        }
        
        // 每日增加
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 由於我們不知道彈性放假與補班的確切細節，這裡使用簡化的 "總天數 - 週末天數" 粗略估計。
    // 為了保證計算結果符合「請假攻略」的邏輯，我們採用預先定義的理想請假天數。
    
    // 這裡為了讓程式可以動，我們假定請假天數為 (總連假天數 / 7) * 5 - 國定假日天數
    // 但因為這太複雜且不準確，我們使用一個更簡單且符合攻略原則的數字：
    
    const totalDays = (endDate.getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24) + 1;
    
    // 由於數據來源為攻略，直接採用預設值作為所需的「特休天數」
    // 這個函數在這個版本中沒有實際使用，請假天數直接從 holidays2026 獲取。
    
    return Math.ceil(totalDays / 7) * 2; // 簡單回傳一個數，實際應使用預設的 requiredDays 數據
}


// ===============================================
// 3. 核心邏輯
// ===============================================

document.getElementById('calcBtn').addEventListener('click', function() {
    const inputDays = parseInt(document.getElementById('inputDays').value);
    const resultsDiv = document.getElementById('results');
    const destinationKey = document.getElementById('destinationSelect').value;
    const data = flightData[destinationKey];
    
    // ★ 薪水小偷計算機輸入 ★
    const salary = parseInt(document.getElementById('salaryInput').value) || 0;
    const dailyRate = salary ? (salary / 30) : 0;
    const salaryResultP = document.getElementById('salaryResult');
    // ★ 薪水小偷計算機輸入結束 ★

    if (isNaN(inputDays) || inputDays < 1 || inputDays > 10) {
        resultsDiv.innerHTML = `<div class="text-center text-red-500 font-bold mt-4 p-4 bg-red-100 rounded-lg">請輸入有效的特休天數 (1 到 10 天)！</div>`;
        return;
    }

    // 篩選出符合使用者特休天數的連假策略
    const validStrategies = holidays2026.map(holiday => {
        // 這裡的 requiredLeaveDays 應為請假攻略中建議的最低請假天數
        // 我們假設請假天數為 (總連假天數 - 國定假日天數)。為了簡化，我們用一個常數來模擬。
        let requiredLeaveDays;
        
        // 模擬攻略所需的請假天數
        if (holiday.name.includes("春節")) {
            requiredLeaveDays = 4; // 請 4 休 16
        } else if (holiday.targetDays === 9) {
            requiredLeaveDays = 3; // 請 3 休 9
        } else if (holiday.targetDays === 8) {
            requiredLeaveDays = 3; // 請 3 休 8
        } else if (holiday.targetDays === 4) {
            requiredLeaveDays = 1; // 請 1 休 4
        } else if (holiday.targetDays === 5) {
            requiredLeaveDays = 2; // 請 2 休 5
        } else {
            requiredLeaveDays = 0;
        }

        // 計算實際放假天數
        const totalDays = holiday.targetDays;
        
        return {
            ...holiday,
            requiredLeaveDays: requiredLeaveDays,
            totalDays: totalDays,
            canAchieve: inputDays >= requiredLeaveDays
        };
    }).filter(strategy => strategy.canAchieve);

    // 輸出結果
    if (validStrategies.length === 0) {
        resultsDiv.innerHTML = `<div class="text-center text-orange-500 font-bold mt-4 p-4 bg-orange-100 rounded-lg">
            抱歉，您剩下的 ${inputDays} 天特休無法實現任何「連休攻略」級別的長假！建議累積更多特休或調整目標。
        </div>`;
        salaryResultP.innerHTML = '（連假方案不足，無法計算薪水小偷金額）';
        return;
    }

    // 將最佳策略 (總天數最長) 放在最前面
    validStrategies.sort((a, b) => b.totalDays - a.totalDays);
    
    // 顯示結果
    let htmlContent = '';
    
    // 顯示撒花特效 (只對最長的連假)
    if (validStrategies[0].totalDays >= 9) {
        const longestName = validStrategies[0].name;
        htmlContent += `
            <div class="text-center mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                <i class="fa-solid fa-fire text-red-500 fa-2x animate-pulse"></i> 
                <span class="text-2xl font-extrabold text-green-700 ml-2">恭喜！您找到了 ${longestName} 的神級連休方案！</span>
            </div>
        `;
        // 觸發撒花特效 (簡易模擬)
        triggerConfetti();
    }
    
    // 更新薪水小偷計算機的文字結果
    const longestStrategy = validStrategies[0];
    const longestEarned = (dailyRate * longestStrategy.totalDays).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    
    if (salary > 0) {
        salaryResultP.innerHTML = `
            🎉 您的 ${longestStrategy.totalDays} 天連假，讓您在玩樂時賺進了
            <span class="text-xl font-extrabold text-green-600">${longestEarned}</span> TWD！
        `;
    } else {
         salaryResultP.innerHTML = '（請輸入月薪，查看您的薪水小偷金額！）';
    }


    htmlContent += `<h3 class="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <i class="fa-solid fa-check-double text-indigo-500 mr-2"></i> 總共找到 ${validStrategies.length} 個方案
    </h3>`;

    validStrategies.forEach(strategy => {
        const startDate = strategy.start;
        const endDate = strategy.end;
        const totalDays = strategy.totalDays;
        const requiredDays = strategy.requiredLeaveDays;

        // 格式化日期 for Skyscanner
        const skyscannerStart = formatToSkyscannerDate(startDate);
        const skyscannerEnd = formatToSkyscannerDate(endDate);

        // 生成機票連結
        let flightLink = data.link.replace('{startDate}', skyscannerStart).replace('{endDate}', skyscannerEnd);
        let linkSection = '';
        
        if (data.link) {
            linkSection = `
                <a href="${flightLink}" target="_blank" id="flightLink" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center flex items-center justify-center shadow-md">
                    <i class="fa-solid fa-plane-departure mr-2"></i> 
                    搜尋 ${data.name} 機票 (共 ${totalDays} 天)
                </a>
            `;
        } else {
            linkSection = `<div class="w-full text-center text-slate-500 py-3">請選擇目的地以搜尋機票</div>`;
        }

        // 計算薪水小偷金額 for 卡片
        const cardEarned = (dailyRate * totalDays).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        const salaryInfo = salary > 0 ? `<p class="text-lg font-bold text-green-600 flex items-center"><i class="fa-solid fa-piggy-bank mr-2"></i> 薪水小偷收益：TWD ${cardEarned}</p>` : '';


        // 組合 HTML 卡片
        htmlContent += `
            <div class="bg-white rounded-xl shadow-2xl overflow-hidden mb-6 border-t-8 border-indigo-500 transform hover:scale-[1.01] transition duration-300">
                <div class="relative h-48 bg-cover bg-center" style="background-image: url('${data.image}');">
                    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                        <span class="text-4xl font-black text-white leading-none">${totalDays} 天連休</span>
                    </div>
                </div>
                
                <div class="p-5">
                    <h4 class="text-2xl font-extrabold mb-2 text-indigo-700">${strategy.name} 攻略</h4>
                    <p class="text-sm text-slate-500 mb-4">
                        從 ${startDate.replace('2026-','')} 到 ${endDate.replace('2026-','')}, 共 ${totalDays} 天
                    </p>
                    
                    <div class="mb-4 space-y-2">
                        <div class="bg-indigo-50 p-3 rounded-lg flex justify-between items-center font-bold text-indigo-800 border-l-4 border-indigo-600">
                            <span>需要請假：</span>
                            <span class="text-2xl">${requiredDays} 天特休</span>
                        </div>
                        <div class="bg-yellow-50 p-3 rounded-lg flex justify-between items-center font-bold text-yellow-800 border-l-4 border-yellow-600">
                            <span>實際放假：</span>
                            <span class="text-2xl">${totalDays} 天</span>
                        </div>
                    </div>

                    ${salaryInfo}

                    <div class="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${linkSection}

                        <button onclick="generateAITrip('${data.name}', '${startDate}', '${endDate}', '${totalDays}')" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center flex items-center justify-center shadow-md">
                            <i class="fa-solid fa-robot mr-2"></i> AI 規劃行程
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mt-3 text-sm">
                        <a href="https://www.saily.com/esim?aid=YOUR_ID" target="_blank" class="text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                            <i class="fa-solid fa-signal mr-1"></i> Saily eSIM
                        </a>
                        <a href="https://www.airhelp.com/en/?c=YOUR_ID" target="_blank" class="text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                            <i class="fa-solid fa-umbrella mr-1"></i> AirHelp 索賠
                        </a>
                    </div>
                    
                    <p class="text-xs text-slate-400 mt-3 text-right">圖片來源: ${data.photographer}</p>

                </div>
            </div>
        `;
    });

    resultsDiv.innerHTML = htmlContent;
});


// ===============================================
// 4. 特效與 AI 函式 (保持不變)
// ===============================================

/**
 * 簡易撒花特效 (為了保持網站輕量，僅使用 CSS 模擬)
 */
function triggerConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti absolute w-3 h-3 rounded-full opacity-0';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${-20 + Math.random() * 5}%`;
        confetti.style.backgroundColor = ['#FFD700', '#FF6347', '#4682B4'][Math.floor(Math.random() * 3)];
        confetti.style.animation = `fall ${1 + Math.random() * 2}s ease-in-out forwards ${Math.random()}s`;
        confettiContainer.appendChild(confetti);
    }
    
    // 移除特效
    setTimeout(() => {
        confettiContainer.remove();
    }, 4000);
}

// 簡易 CSS 模擬動畫
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);


/**
 * 模擬 AI 行程生成 (需要後端 API)
 * @param {string} destination - 目的地名稱
 * @param {string} start - 開始日期 (YYYY-MM-DD)
 * @param {string} end - 結束日期 (YYYY-MM-DD)
 * @param {number} totalDays - 總天數
 */
async function generateAITrip(destination, start, end, totalDays) {
    const aiButton = event.currentTarget;
    const originalText = aiButton.innerHTML;
    
    // 禁用按鈕並顯示載入中
    aiButton.disabled = true;
    aiButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> AI 規劃中...';

    const prompt = `請為我規劃一個從 ${start} 到 ${end}，共 ${totalDays} 天的 ${destination} 旅遊行程。請以繁體中文，用 HTML 標籤（使用 <h2>, <h3>, <ul>, <li>, <p>）詳細列出每天的行程建議、美食推薦，並用粗體字標註關鍵地點。`;
    
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP 錯誤: ${response.status}`);
        }

        const data = await response.json();
        
        // 尋找最近的結果卡片來插入 AI 結果
        const card = aiButton.closest('.rounded-xl');
        const aiResultDiv = card.querySelector('.ai-result');

        if (aiResultDiv) {
            aiResultDiv.innerHTML = `<div class="mt-4 p-4 bg-blue-50 border-t-2 border-blue-500 rounded-lg shadow-inner">
                <h4 class="text-xl font-bold text-blue-700 mb-3"><i class="fa-solid fa-wand-magic-sparkles mr-2"></i> AI 推薦行程</h4>
                ${data.tripPlan}
            </div>`;
        } else {
            // 如果沒有預先準備的 div，則新增一個
            card.querySelector('.p-5').innerHTML += `<div class="ai-result mt-4 p-4 bg-blue-50 border-t-2 border-blue-500 rounded-lg shadow-inner">
                <h4 class="text-xl font-bold text-blue-700 mb-3"><i class="fa-solid fa-wand-magic-sparkles mr-2"></i> AI 推薦行程</h4>
                ${data.tripPlan}
            </div>`;
        }

    } catch (error) {
        console.error('AI 生成行程失敗:', error);
        alert(`AI 規劃失敗：${error.message} (可能 Vercel 資源限制或 OpenAI 餘額不足)`);
    } finally {
        // 恢復按鈕狀態
        aiButton.disabled = false;
        aiButton.innerHTML = originalText;
    }
}