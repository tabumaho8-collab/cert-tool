// settings.js (ハンコ対応版)

// ▼ 保存するデータのキー
const KEY_COMPANY = "my_tool_company_info";

// ■ データ保存（index.html用）
function saveCompanyData() {
    // 1. テキスト情報の取得
    const data = {
        name: document.getElementById('setCompName').value,
        address: document.getElementById('setCompAddr').value,
        rep: document.getElementById('setCompRep').value,
        regNo: document.getElementById('setRegNo').value,
        seal: null // ハンコデータ用（まずは空で）
    };

    // 2. ハンコ画像の処理
    const fileInput = document.getElementById('setSealFile');
    
    // 画像が選択されている場合
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // サイズチェック (500KB以下推奨)
        if (file.size > 500000) {
            alert("画像サイズが大きすぎます。\n500KB以下の画像を使用してください。");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            data.seal = e.target.result; // 画像を文字列データに変換
            finalizeSave(data);
        };
        reader.readAsDataURL(file);
    } else {
        // 画像が選択されていない場合、既存の画像を維持する
        const existing = localStorage.getItem(KEY_COMPANY);
        if (existing) {
            const oldData = JSON.parse(existing);
            data.seal = oldData.seal;
        }
        finalizeSave(data);
    }
}

// 保存の仕上げ関数
function finalizeSave(data) {
    try {
        localStorage.setItem(KEY_COMPANY, JSON.stringify(data));
        alert("会社情報とハンコを保存しました！\n各ツールに自動反映されます。");
        // プレビュー更新
        if(document.getElementById('previewSeal')) {
            document.getElementById('previewSeal').src = data.seal || "";
        }
    } catch (e) {
        alert("保存に失敗しました。画像サイズが大きすぎる可能性があります。");
    }
}

// ■ データ読み込み（index.html用）
function loadSettingsDisplay() {
    const json = localStorage.getItem(KEY_COMPANY);
    if(json) {
        const data = JSON.parse(json);
        if(document.getElementById('setCompName')) document.getElementById('setCompName').value = data.name;
        if(document.getElementById('setCompAddr')) document.getElementById('setCompAddr').value = data.address;
        if(document.getElementById('setCompRep')) document.getElementById('setCompRep').value = data.rep;
        if(document.getElementById('setRegNo')) document.getElementById('setRegNo').value = data.regNo;
        
        // ハンコプレビュー表示
        if(data.seal && document.getElementById('previewSeal')) {
            document.getElementById('previewSeal').src = data.seal;
            document.getElementById('previewSeal').style.display = "block";
        }
    }
}

// ■ データ反映（各ツール用）
function applyCompanyData() {
    const json = localStorage.getItem(KEY_COMPANY);
    if (!json) return;

    const data = JSON.parse(json);

    // テキスト反映
    const map = {
        name:    ['compName', 'iptIssuerName'],
        address: ['compAddress', 'iptIssuerAddr'],
        rep:     ['compRep', 'iptIssuerRep'],
        regNo:   ['iptRegNo']
    };

    setVal(map.name, data.name);
    setVal(map.address, data.address);
    setVal(map.rep, data.rep);
    setVal(map.regNo, data.regNo);

    // ★ハンコ画像の反映★
    // 各ツールの <img id="viewSeal"> を探してセットする
    const sealImg = document.getElementById('viewSeal');
    if (sealImg && data.seal) {
        sealImg.src = data.seal;
        sealImg.style.display = "block"; // 画像があれば表示
    }

    // 画面更新関数があれば実行
    if(typeof updateCert === 'function') updateCert();
    if(typeof update === 'function') update();
}

function setVal(idList, value) {
    if(!value) return;
    for (let id of idList) {
        const el = document.getElementById(id);
        if (el) { el.value = value; }
    }
}