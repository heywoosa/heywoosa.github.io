// --- 全域設定 ---

// ⚠️ 【賺錢設定】請在此填入你的 Skyscanner/Travelpayouts Affiliate ID
const skyscannerAffiliateId = ""; 

// 預設出發地機場代碼 (TPE = 桃園機場)
const originAirport = "TPE"; 

// --- 資料設定 ---

// 2026 (民國115年) 請假攻略資料
const strategies = [
    {
        name: "元旦跨年 (2026首發)",
        displayPeriod: "2025/12/27 - 2026/1/4",
        startDate: "2025/12/27",
        endDate: "2026/01/04",
        cost: 3,
        totalDays: 9,
        desc: "元旦在週四，1/2 彈性放假。往前請 12/29-31，跨年直接爽休 9 天！",
        cpLevel: "high"
    },
    {
        name: "春節+228 (神級連休)",
        displayPeriod: "2/14 - 3/1",
        startDate: "2026/02/14",
        endDate: "2026/03/01",
        cost: 4, 
        totalDays: 16,
        desc: "請 2/23-2/26 (4天)，無縫串聯春節與228連假，半個月不用進公司！",
        cpLevel: "god"
    },
    {
        name: "清明連假",
        displayPeriod: "3/28 - 4/6",
        startDate: "2026/03/28",
        endDate: "2026/04/06",
        cost: 4,
        totalDays: 10,
        desc: "請 3/30-4/2 (4天)，避開清明人潮，春天賞櫻最佳時機。",
        cpLevel: "normal"
    },
    {
        name: "端午避暑",
        displayPeriod: "6/13 - 6/21",
        startDate: "2026/06/13",
        endDate: "2026/06/21",
        cost: 4,
        totalDays: 9,
        desc: "請 6/15-6/18 (4天)，去海島國家剛剛好。",
        cpLevel: "normal"
    },
    {
        name: "中秋連假",
        displayPeriod: "9/19 - 9/27",
        startDate: "2026/09/19",
        endDate: "2026/09/27",
        cost: 4,
        totalDays: 9,
        desc: "請 9/21-9/24 (4天)，秋高氣爽出遊去。",
        cpLevel: "normal"
    },
    {
        name: "國慶連假",
        displayPeriod: "10/3 - 10/11",
        startDate: "2026/10/03",
        endDate: "2026/10/11",
        cost: 4,
        totalDays: 9,
        desc: "請 10/5-10/8 (4天)，消耗年底特休的好機會。",
        cpLevel: "normal"
    }
];

// 詳細飛行與旅遊資料
const flightData = {
    tokyo: { 
        code: "TYO", 
        time: "3小時 30分", 
        region: "東北亞", 
        daysRec: "建議 5 天",
        currency: "日圓 (JPY)",
        voltage: "100V (雙平腳)",
        visa: "免簽證 (90天)",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/KXQkeWEv",
        esimLink: "https://saily.tpx.li/XGzD5n5B"
    },
    osaka: { 
        code: "OSA", 
        time: "2小時 40分", 
        region: "東北亞", 
        daysRec: "建議 5 天",
        currency: "日圓 (JPY)",
        voltage: "100V (雙平腳)",
        visa: "免簽證 (90天)",
        // ★ 已更換為大阪城圖片 (穩定版) ★
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/UFhy7kHv",
        esimLink: "https://saily.tpx.li/XGzD5n5B"
    },
    seoul: { 
        code: "SEL", 
        time: "2小時 30分", 
        region: "東北亞", 
        daysRec: "建議 4-5 天",
        currency: "韓元 (KRW)",
        voltage: "220V (雙圓孔)",
        visa: "免簽證 / K-ETA",
        image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/dFbiljcO",
        esimLink: "https://saily.tpx.li/xOHkTeIS"
    },
    bangkok: { 
        code: "BKKT", 
        time: "3小時 50分", 
        region: "東南亞", 
        daysRec: "建議 5 天",
        currency: "泰銖 (THB)",
        voltage: "220V (雙孔通用)",
        visa: "免簽證 (暫定)",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/BLSkVPup",
        esimLink: "https://saily.tpx.li/cNiOBsjw"
    },
    singapore: { 
        code: "SIN", 
        time: "4小時 30分", 
        region: "東南亞", 
        daysRec: "建議 4 天",
        currency: "新幣 (SGD)",
        voltage: "230V (英式三方孔)",
        visa: "免簽證 (30天)",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/Whd4fr4m",
        esimLink: "https://saily.tpx.li/zKiKmHzi"
    },
    la: { 
        code: "LAX", 
        time: "12小時 00分", 
        region: "美洲", 
        daysRec: "建議 10 天以上",
        currency: "美金 (USD)",
        voltage: "120V (雙平腳)",
        visa: "需申請 ESTA",
        image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/sXDqqfcl",
        esimLink: "https://saily.tpx.li/OFLJOMWU"
    },
    london: { 
        code: "LON", 
        time: "14小時 10分", 
        region: "歐洲", 
        daysRec: "建議 10 天以上",
        currency: "英鎊 (GBP)",
        voltage: "230V (英式三方孔)",
        visa: "免簽證 (180天)",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/oBdkNOG8",
        esimLink: "https://saily.tpx.li/pBukZW4p"
    },
    paris: { 
        code: "PAR", 
        time: "13小時 40分", 
        region: "歐洲", 
        daysRec: "建議 10 天以上",
        currency: "歐元 (EUR)",
        voltage: "230V (雙圓孔)",
        visa: "免簽證 (90天)",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        link: "https://klook.tpx.li/NixH7qje",
        esimLink: "https://saily.tpx.li/DbGWDs9k"
    }
};

// --- 全域變數 ---
let currentShareText = ""; 

// --- 輔助功能 ---
function formatDateForUrl(dateStr) {
    if(!dateStr) return "";
    const cleanDate = dateStr.replace(/\D/g, ''); 
    return cleanDate.slice(2); // YYMMDD
}

function getGoogleCalendarUrl(title, startStr, endStr) {
    const start = startStr.replace(/\//g, '');
    const end = endStr.replace(/\//g, ''); 
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=由2026請假攻略計算產生`;
}

// --- 主要邏輯 ---

document.getElementById('calcBtn').addEventListener('click', function() {
    const inputElement = document.getElementById('leaveInput');
    const inputDays = parseInt(inputElement.value);
    const resultSection = document.getElementById('resultSection');
    const container = document.getElementById('resultContainer');
    const midAd = document.getElementById('midPageAd');
    const destSelect = document.getElementById('destinationSelect');
    
    container.innerHTML = '';
    
    if (isNaN(inputDays) || inputDays < 0) {
        alert("請輸入有效的特休天數！");
        return;
    }

    resultSection.classList.remove('hidden');
    if(midAd) midAd.classList.remove('hidden');

    const validStrategies = strategies.filter(s => inputDays >= s.cost);

    if (validStrategies.length === 0) {
        container.innerHTML = `
            <div class="md:col-span-2 text-center text-slate-500 py-10 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <i class="fa-solid fa-piggy-bank text-4xl mb-3 text-slate-300"></i>
                <p class="text-lg font-medium">特休餘額不足</p>
                <p class="text-sm mt-1">2026 的攻略大多需要 3~4 天特休。<br>建議您安排週末的輕旅行！</p>
            </div>
        `;
    } else {
        validStrategies.forEach(strategy => {
            let borderClass = 'border-l-8 border-teal-400';
            let badge = '';
            
            if (strategy.cpLevel === 'god') {
                borderClass = 'border-l-8 border-purple-500 ring-1 ring-purple-100';
                badge = `<div class="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">👑 神級攻略</div>`;
            } else if (strategy.cpLevel === 'high') {
                borderClass = 'border-l-8 border-orange-400';
                badge = `<div class="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">🔥 CP值高</div>`;
            }

            const remaining = inputDays - strategy.cost;

            // --- Skyscanner 機票連結 ---
            const selectedDestValue = destSelect.value;
            let destCode = "everywhere"; 
            let btnText = "🔍 搜尋該時段機票"; 
            
            if (selectedDestValue && flightData[selectedDestValue]) {
                destCode = flightData[selectedDestValue].code;
                const countryName = document.querySelector(`#destinationSelect option[value="${selectedDestValue}"]`).text.split(' ')[1]; 
                btnText = `✈️ 搜${countryName}便宜機票`;
            }

            const startDateCode = formatDateForUrl(strategy.startDate);
            const endDateCode = formatDateForUrl(strategy.endDate);
            
            let flightUrl = "";
            if (destCode === "everywhere") {
                flightUrl = `https://www.skyscanner.com.tw/transport/flights-from/${originAirport}/${startDateCode}/${endDateCode}/`;
            } else {
                flightUrl = `https://www.skyscanner.com.tw/transport/flights/${originAirport}/${destCode}/${startDateCode}/${endDateCode}/`;
            }
            
            if (skyscannerAffiliateId) {
                flightUrl += `?affiliateId=${skyscannerAffiliateId}`;
            }

            const calUrl = getGoogleCalendarUrl(`🎉 休假囉！(${strategy.name})`, strategy.startDate, strategy.endDate);

            // --- 建立卡片 HTML ---
            const cardHTML = `
                <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 ${borderClass} relative overflow-hidden flex flex-col">
                    ${badge}
                    <div class="flex justify-between items-start mb-3 mt-2">
                        <div>
                            <h4 class="text-xl font-bold text-slate-800">${strategy.name}</h4>
                            <p class="text-sm text-slate-500 font-medium"><i class="fa-regular fa-calendar mr-1"></i> ${strategy.displayPeriod}</p>
                        </div>
                        <div class="text-center bg-slate-100 rounded-lg p-2 min-w-[70px]">
                            <span class="block text-2xl font-bold text-teal-600">${strategy.totalDays}</span>
                            <span class="text-xs text-slate-500">連休</span>
                        </div>
                    </div>
                    <div class="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 space-y-2 mb-2 flex-grow">
                        <p><i class="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>${strategy.desc}</p>
                        <div class="flex items-center justify-between border-t border-slate-200 pt-2 mt-2">
                            <span><i class="fa-solid fa-ticket text-red-400 mr-1"></i>使用: <b>${strategy.cost}</b> 天</span>
                            <span class="text-slate-400 text-xs">剩餘: ${remaining} 天</span>
                        </div>
                    </div>

                    <a href="${calUrl}" target="_blank" class="text-xs text-slate-400 underline hover:text-teal-600 block text-center mb-4">
                        <i class="fa-regular fa-calendar-plus"></i> 加入 Google 行事曆
                    </a>
                    
                    <div class="flex gap-3 mt-auto">
                        <button onclick="openShareModal('${strategy.name}', '${strategy.desc}')" class="flex-1 text-center text-teal-600 text-sm border border-teal-200 rounded py-2 hover:bg-teal-50 transition flex items-center justify-center gap-1 font-medium">
                            <i class="fa-solid fa-share-nodes"></i> 分享
                        </button>
                        
                        <a href="${flightUrl}" target="_blank" class="flex-1 text-center bg-rose-500 hover:bg-rose-600 text-white text-sm rounded py-2 transition flex items-center justify-center gap-1 font-bold shadow-sm">
                            ${btnText}
                        </a>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    }
    
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// 2. 飛行選單改變事件
document.getElementById('destinationSelect').addEventListener('change', function() {
    const val = this.value;
    const resultDiv = document.getElementById('flightResult');
    const calcBtn = document.getElementById('calcBtn');

    if (!document.getElementById('resultSection').classList.contains('hidden')) {
        calcBtn.click();
    }
    
    if (!val || !flightData[val]) {
        resultDiv.classList.add('hidden');
        resultDiv.classList.remove('flex');
        return;
    }

    const data = flightData[val];
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('flex');
    
    // --- UI：圖文卡片 ---
    resultDiv.innerHTML = `
        <div class="relative h-48 rounded-xl overflow-hidden mb-4 shadow-md group">
            <img src="${data.image}" alt="${data.region}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                    <p class="text-white font-bold text-2xl shadow-sm text-shadow">${document.querySelector(`#destinationSelect option[value="${val}"]`).text.split(' ')[1]}</p>
                    <p class="text-indigo-200 text-sm flex items-center">
                        <i class="fa-solid fa-plane-arrival mr-1"></i> 飛行約 ${data.time}
                    </p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-3 text-center mb-4">
            <div class="bg-white p-2 rounded-lg border border-indigo-50 shadow-sm">
                <i class="fa-solid fa-coins text-indigo-500 mb-1 text-lg"></i>
                <p class="text-xs text-slate-400">貨幣</p>
                <p class="text-xs font-bold text-slate-700">${data.currency.split(' ')[0]}</p>
            </div>
            <div class="bg-white p-2 rounded-lg border border-indigo-50 shadow-sm">
                <i class="fa-solid fa-passport text-indigo-500 mb-1 text-lg"></i>
                <p class="text-xs text-slate-400">簽證</p>
                <p class="text-xs font-bold text-slate-700">${data.visa.split(' ')[0]}</p>
            </div>
            <div class="bg-white p-2 rounded-lg border border-indigo-50 shadow-sm">
                <i class="fa-solid fa-plug text-indigo-500 mb-1 text-lg"></i>
                <p class="text-xs text-slate-400">電壓</p>
                <p class="text-xs font-bold text-slate-700">${data.voltage.split(' ')[0]}</p>
            </div>
        </div>

        ${data.link ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-indigo-50">
            <a href="${data.link}" target="_blank" class="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold py-3 rounded-lg transition shadow-md group">
                <i class="fa-solid fa-ticket mr-2 group-hover:-rotate-12 transition-transform"></i>
                Klook 行程
            </a>
            <a href="${data.esimLink}" target="_blank" class="flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-3 rounded-lg transition shadow-md group">
                <i class="fa-solid fa-wifi mr-2"></i>
                Saily 網卡
            </a>
        </div>
        ` : ''}
    `;
});

// --- 社群分享功能 ---
function openShareModal(name, desc) {
    const myWebsiteUrl = window.location.href; 
    currentShareText = `【2026 請假攻略】\n${name}\n${desc}\n\n快來算你的連假方案：${myWebsiteUrl}`;
    document.getElementById('shareModal').classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('shareModal').classList.add('hidden');
}

function shareToLine() {
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(currentShareText)}`;
    window.open(url, '_blank');
    closeShareModal();
}

function shareToThreads() {
    const url = `https://www.threads.net/intent/post?text=${encodeURIComponent(currentShareText)}`;
    window.open(url, '_blank');
    closeShareModal();
}

function copyAndOpenIG() {
    navigator.clipboard.writeText(currentShareText).then(() => {
        alert("文字已複製！\n即將為您打開 Instagram，您可以直接貼上發佈限動或貼文。");
        window.location.href = "instagram://app"; 
        setTimeout(function() {
            window.open("https://www.instagram.com/", "_blank");
        }, 500);
    }).catch(err => {
        console.error('複製失敗', err);
        alert("複製失敗，請手動複製");
    });
    closeShareModal();
}

function copyTextOnly() {
    navigator.clipboard.writeText(currentShareText).then(() => {
        alert("攻略已複製到剪貼簿！");
    });
    closeShareModal();
}