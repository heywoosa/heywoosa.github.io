// ===============================================
// 1. 核心資料與設定
// ===============================================

// ⚠️ 【賺錢設定】請在此填入你的 Skyscanner/Travelpayouts Affiliate ID
const skyscannerAffiliateId = ""; 

// 預設出發地機場代碼 (TPE = 桃園機場)
const originAirport = "TPE"; 

// 2026 年國定假日數據 (起始日, 結束日, 名稱, 請假天數, 總天數)
const strategies = [
    { name: "元旦", displayPeriod: "2025/12/27 - 2026/1/4", startDate: "2025-12-27", endDate: "2026-01-04", targetDays: 9, cost: 3, requiredLeaveDays: 3, type: 'long', cpLevel: "high" },
    { name: "春節 & 228 連休", displayPeriod: "2/14 - 3/1", startDate: "2026-02-14", endDate: "2026-03-01", targetDays: 16, cost: 4, requiredLeaveDays: 4, type: 'super', cpLevel: "god" },
    { name: "清明節", displayPeriod: "2026/04/03 - 2026/04/12", startDate: "2026-04-03", endDate: "2026-04-12", targetDays: 10, cost: 4, requiredLeaveDays: 4, type: 'long', cpLevel: "normal" },
    { name: "端午節", displayPeriod: "2026/06/19 - 2026/06-28", startDate: "2026-06-19", endDate: "2026-06-28", targetDays: 10, cost: 4, requiredLeaveDays: 4, type: 'long', cpLevel: "normal" },
    { name: "中秋節", displayPeriod: "2026/10/02 - 2026/10-06", startDate: "2026-10-02", endDate: "2026-10-06", targetDays: 5, cost: 2, requiredLeaveDays: 2, type: 'short', cpLevel: "short" },
    { name: "國慶日", displayPeriod: "2026/10/09 - 2026/10-18", startDate: "2026-10-09", endDate: "2026-10-18", targetDays: 10, cost: 4, requiredLeaveDays: 4, type: 'long', cpLevel: "normal" },
];

// 旅遊目的地資料 (包含機票連結參數和圖片版權)
const flightData = {
    // 預設 (未選)
    'none': { 
        city: '未選擇目的地', name: '未選擇目的地', currency: 'TWD', 
        link: '', esimLink: '', image: 'https://images.unsplash.com/photo-1517400508544-7f830d17676e?auto=format&fit=crop&w=800&q=80',
        photographer: 'Photo by Annie Spratt / Unsplash', airport: '' 
    },
    // 日本
    'tokyo': { 
        city: "東京", name: '日本 東京 (NRT)', code: "TYO", time: "3小時 30分", region: "東北亞", daysRec: "建議 5 天", currency: "日圓 (JPY)", voltage: "100V (雙平腳)", visa: "免簽證 (90天)", 
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by David Rangel / Unsplash', link: "https://klook.tpx.li/KXQkeWEv", esimLink: "https://saily.tpx.li/XGzD5n5B" 
    },
    'osaka': { 
        city: "大阪", name: '日本 大阪 (KIX)', code: "OSA", time: "2小時 40分", region: "東北亞", daysRec: "建議 5 天", currency: "日圓 (JPY)", voltage: "100V (雙平腳)", visa: "免簽證 (90天)", 
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by Yu Kato / Unsplash', link: "https://klook.tpx.li/UFhy7kHv", esimLink: "https://saily.tpx.li/XGzD5n5B"
    },
    // 韓國
    'seoul': { 
        city: "首爾", name: '韓國 首爾 (ICN)', code: "SEL", time: "2小時 30分", region: "東北亞", daysRec: "建議 4-5 天", currency: "韓元 (KRW)", voltage: "220V (雙圓孔)", visa: "免簽證 / K-ETA", 
        image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by Jiahui Chen / Unsplash', link: "https://klook.tpx.li/dFbiljcO", esimLink: "https://saily.tpx.li/xOHkTeIS"
    },
    'busan': { 
        city: "釜山", name: '韓國 釜山 (PUS)', code: "PUS", time: "2小時 20分", region: "東北亞", daysRec: "建議 4 天", currency: "韓元 (KRW)", voltage: "220V (雙圓孔)", visa: "免簽證 / K-ETA", 
        image: "https://images.unsplash.com/photo-1563242045-8f6424e8e121?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by Eugene P / Unsplash', link: "https://klook.tpx.li/your_busan_link", esimLink: "https://saily.tpx.li/xOHkTeIS"
    },
    // 泰國
    'thailand': { 
        city: "曼谷", name: '泰國 曼谷 (BKK)', code: "BKK", time: "3小時 50分", region: "東南亞", daysRec: "建議 5 天", currency: "泰銖 (THB)", voltage: "220V (雙孔通用)", visa: "免簽證 (暫定)", 
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by David Dvoracek / Unsplash', link: "https://klook.tpx.li/BLSkVPup", esimLink: "https://saily.tpx.li/cNiOBsjw"
    },
    'phuket': { 
        city: "普吉島", name: '泰國 普吉島 (HKT)', code: "HKT", time: "4小時 40分", region: "東南亞", daysRec: "建議 6 天", currency: "泰銖 (THB)", voltage: "220V (雙孔通用)", visa: "免簽證 (暫定)", 
        image: "https://images.unsplash.com/photo-1615852504443-4e892c2b7f7e?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by T. P. Wong / Unsplash', link: "https://klook.tpx.li/your_phuket_link", esimLink: "https://saily.tpx.li/cNiOBsjw"
    },
    // 亞洲其他
    'hongkong': { 
        city: "香港", name: '香港 (HKG)', code: "HKG", time: "1小時 40分", region: "東北亞", daysRec: "建議 3-4 天", currency: "港幣 (HKD)", voltage: "220V (英式三腳)", visa: "免簽證 (30天)", 
        image: "https://images.unsplash.com/photo-1517400508544-7f830d17676e?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by S. C. Sze / Unsplash', link: "https://klook.tpx.li/your_hongkong_link", esimLink: "https://saily.tpx.li/esim-hong-kong"
    },
    'singapore': { 
        city: "新加坡", name: '新加坡 (SIN)', code: "SIN", time: "4小時 30分", region: "東南亞", daysRec: "建議 4 天", currency: "新幣 (SGD)", voltage: "230V (英式三方孔)", visa: "免簽證 (30天)", 
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by S. D. Lee / Unsplash', link: "https://klook.tpx.li/Whd4fr4m", esimLink: "https://saily.tpx.li/zKiKmHzi"
    },
    'vietnam-hanoi': { 
        city: "河內", name: '越南 河內 (HAN)', code: "HAN", time: "3小時 0分", region: "東南亞", daysRec: "建議 5 天", currency: "越南盾 (VND)", voltage: "220V (雙圓孔)", visa: "需簽證", 
        image: "https://images.unsplash.com/photo-1516008104337-b6fd14589926?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by M. H. Vu / Unsplash', link: "https://klook.tp.st/your_hanoi_link", esimLink: "https://saily.tpx.li/esim-vietnam"
    },
    // 長程
    'la': { 
        city: "洛杉磯", name: '美國 洛杉磯 (LAX)', code: "LAX", time: "12小時 00分", region: "美洲", daysRec: "建議 10 天以上", currency: "美金 (USD)", voltage: "120V (雙平腳)", visa: "需申請 ESTA", 
        image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by S. D. Lee / Unsplash', link: "https://klook.tpx.li/sXDqqfcl", esimLink: "https://saily.tpx.li/OFLJOMWU"
    },
    'london': { 
        city: "倫敦", name: '英國 倫敦 (LON)', code: "LON", time: "14小時 10分", region: "歐洲", daysRec: "建議 10 天以上", currency: "英鎊 (GBP)", voltage: "230V (英式三方孔)", visa: "免簽證 (180天)", 
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by S. D. Lee / Unsplash', link: "https://klook.tpx.li/oBdkNOG8", esimLink: "https://saily.tpx.li/pBukZW4p"
    },
    'paris': { 
        city: "巴黎", name: '法國 巴黎 (CDG)', code: "PAR", time: "13小時 40分", region: "歐洲", daysRec: "建議 10 天以上", currency: "歐元 (EUR)", voltage: "230V (雙圓孔)", visa: "免簽證 (90天)", 
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        photographer: 'Photo by S. D. Lee / Unsplash', link: "https://klook.tpx.li/NixH7qje", esimLink: "https://saily.tpx.li/DbGWDs9k"
    }
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
 * 產生 Google Calendar 連結
 */
function getGoogleCalendarUrl(title, startStr, endStr) {
    const start = startStr.replace(/\-/g, ''); // 轉換 YYYY-MM-DD -> YYYYMMDD
    const end = endStr.replace(/\-/g, ''); 
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=由2026請假攻略計算產生`;
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
        let requiredLeaveDays;
        
        // 模擬攻略所需的請假天數 (硬編碼自 HOLIDAYS2026)
        if (holiday.targetDays === 16) {
            requiredLeaveDays = 4;
        } else if (holiday.targetDays === 10) {
            requiredLeaveDays = 4;
        } else if (holiday.targetDays === 9) {
            requiredLeaveDays = 3;
        } else if (holiday.targetDays === 5) {
            requiredLeaveDays = 2;
        } else if (holiday.targetDays === 4) {
            requiredLeaveDays = 1;
        } else {
            requiredLeaveDays = 0;
        }

        return {
            ...holiday,
            requiredLeaveDays: requiredLeaveDays,
            totalDays: holiday.targetDays,
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
    
    let htmlContent = '';
    
    // 顯示撒花特效 (只對最長的連假)
    if (validStrategies[0].totalDays >= 9 && window.confetti) {
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
                <a href="${flightLink}" target="_blank" id="flightLink" class="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center flex items-center justify-center shadow-md">
                    <i class="fa-solid fa-plane-departure mr-2"></i> 
                    搜尋 ${data.airport} 機票 (共 ${totalDays} 天)
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
                        從 ${startDate.replace('2026-','')} 到 ${endDate.replace('2026-','')}
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

                        <button onclick="generateAITrip('${data.city}', '${startDate}', '${endDate}', '${totalDays}')" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-center flex items-center justify-center shadow-md">
                            <i class="fa-solid fa-robot mr-2"></i> AI 規劃行程
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mt-3 text-sm">
                        <a href="${data.esimLink}" target="_blank" class="text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                            <i class="fa-solid fa-wifi mr-1"></i> Saily eSIM
                        </a>
                        <a href="${data.link}" target="_blank" class="text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                            <i class="fa-solid fa-ticket mr-1"></i> Klook 行程
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
// 4. 特效與 AI 函式
// ===============================================

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

const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);


async function generateAITrip(destination, start, end, totalDays) {
    const aiButton = event.currentTarget;
    const originalText = aiButton.innerHTML;
    
    // 尋找最近的結果卡片來插入 AI 結果
    const card = aiButton.closest('.rounded-xl');
    let aiResultDiv = card.querySelector('.ai-result');

    if (!aiResultDiv) {
        aiResultDiv = document.createElement('div');
        aiResultDiv.className = 'ai-result mt-4';
        card.querySelector('.p-5').appendChild(aiResultDiv);
    }
    
    // UI 鎖定
    aiButton.disabled = true;
    aiButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> AI 規劃中...';
    aiResultDiv.classList.add('hidden');
    aiResultDiv.innerHTML = '';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                destination: destination, 
                days: totalDays // 傳遞實際天數給 API
            })
        });

        const data = await response.json();

        if (response.ok) {
            aiResultDiv.innerHTML = `<div class="mt-4 p-4 bg-purple-50 border-t-2 border-purple-500 rounded-lg shadow-inner text-left">
                <h4 class="text-xl font-bold text-purple-700 mb-3"><i class="fa-solid fa-wand-magic-sparkles mr-2"></i> AI 推薦行程 (${totalDays}天)</h4>
                <div class="ai-content">${data.result}</div>
            </div>`;
            aiResultDiv.classList.remove('hidden');
            aiButton.innerHTML = '<i class="fa-solid fa-check mr-2"></i> 規劃完成！';
        } else {
            console.error("API Error Data:", data);
            throw new Error(data.message || '無法連線到 AI 服務');
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        alert('AI 暫時無法回應，請檢查 Vercel Logs！');
        aiButton.innerHTML = '<i class="fa-solid fa-rotate-right mr-2"></i> 再試一次';
    } finally {
        aiButton.disabled = false;
    }
}s