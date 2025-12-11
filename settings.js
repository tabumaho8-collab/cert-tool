// settings.js

// ▼ 保存するデータのキー（名前）
const KEY_COMPANY = "my_tool_company_info";

// ■ データ保存（index.html用）
function saveCompanyData() {
    const data = {
        name: document.getElementById('setCompName').value,
        address: document.getElementById('setCompAddr').value,
        rep: document.getElementById('setCompRep').value,
        regNo: document.getElementById('setRegNo').value
    };
    // ブラウザに保存
    localStorage.setItem(KEY_COMPANY, JSON.stringify(data));
    alert("会社情報を保存しました！\n各ツールを開くと自動入力されます。");
}

// ■ データ読み込み（index.html用：画面開いた時に表示）
function loadSettingsDisplay() {
    const json = localStorage.getItem(KEY_COMPANY);
    if(json) {
        const data = JSON.parse(json);
        if(document.getElementById('setCompName')) document.getElementById('setCompName').value = data.name;
        if(document.getElementById('setCompAddr')) document.getElementById('setCompAddr').value = data.address;
        if(document.getElementById('setCompRep')) document.getElementById('setCompRep').value = data.rep;
        if(document.getElementById('setRegNo')) document.getElementById('setRegNo').value = data.regNo;
    }
}

// ■ データ反映（各ツール用）
function applyCompanyData() {
    const json = localStorage.getItem(KEY_COMPANY);
    if (!json) return; // データなければ何もしない

    const data = JSON.parse(json);

    // --- IDのゆらぎを吸収するマッピング設定 ---
    // [在職証明書のID, 領収証のID, 将来のID...] の順で登録
    const map = {
        name:    ['compName', 'iptIssuerName'],
        address: ['compAddress', 'iptIssuerAddr'],
        rep:     ['compRep', 'iptIssuerRep'],
        regNo:   ['iptRegNo']
    };

    // 存在するIDを探して値をセット
    setVal(map.name, data.name);
    setVal(map.address, data.address);
    setVal(map.rep, data.rep);
    setVal(map.regNo, data.regNo);

    // 画面のプレビュー更新関数があれば実行（updateCertとかupdateとか）
    if(typeof updateCert === 'function') updateCert();
    if(typeof update === 'function') update();
}

// 実際にセットする補助関数
function setVal(idList, value) {
    if(!value) return;
    for (let id of idList) {
        const el = document.getElementById(id);
        if (el) {
            el.value = value;
        }
    }
}