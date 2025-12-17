/* settings.js - v5.0 */
const KEY_COMPANY = "my_tool_company_info";

// ■設定画面(index.html)で保存ボタンを押した時の処理
function saveSettings() {
    const data = {
        name: document.getElementById('setIssuerName').value,
        addr: document.getElementById('setIssuerAddr').value,
        regNo: document.getElementById('setRegNo').value,
        rep: document.getElementById('setIssuerRep').value,
        // 画像データはプレビューのsrc属性から取得（Base64文字列）
        sealCompany: document.getElementById('prevCompany').src || "",
        sealPersonal: document.getElementById('prevPersonal').src || ""
    };

    // 画像が"data:"で始まらない場合（display:noneで空の場合）は保存データを空にする
    if(document.getElementById('prevCompany').style.display === 'none') data.sealCompany = "";
    if(document.getElementById('prevPersonal').style.display === 'none') data.sealPersonal = "";

    try {
        localStorage.setItem(KEY_COMPANY, JSON.stringify(data));
        alert("✅ 設定を保存しました！\n各ツールを開くと自動で反映されます。");
    } catch (e) {
        alert("❌ エラー：保存できませんでした。\n画像サイズが大きすぎる可能性があります (500KB以下推奨)。");
        console.error(e);
    }
}

// ■設定画面(index.html)を開いた時に、保存済みデータを入力欄に戻す処理
function loadSettingsToInputs() {
    const json = localStorage.getItem(KEY_COMPANY);
    if (!json) return;

    const data = JSON.parse(json);
    if(data.name) document.getElementById('setIssuerName').value = data.name;
    if(data.addr) document.getElementById('setIssuerAddr').value = data.addr;
    if(data.regNo) document.getElementById('setRegNo').value = data.regNo;
    if(data.rep) document.getElementById('setIssuerRep').value = data.rep;

    // 画像プレビュー復元
    if(data.sealCompany && data.sealCompany.startsWith("data:")) {
        const img = document.getElementById('prevCompany');
        img.src = data.sealCompany;
        img.style.display = "block";
    }
    if(data.sealPersonal && data.sealPersonal.startsWith("data:")) {
        const img = document.getElementById('prevPersonal');
        img.src = data.sealPersonal;
        img.style.display = "block";
    }
}

// ■各ツール(seikyu.html等)で共通データを適用する処理
function applyCompanyData() {
    const json = localStorage.getItem(KEY_COMPANY);
    if (!json) return;

    const data = JSON.parse(json);
    window.companyData = data; // グローバル変数に入れて、ツール側でハンコ切替に使う

    // IDが一致する要素があれば値を入れる
    const map = {
        'iptIssuerName': data.name,
        'iptIssuerAddr': data.addr,
        'iptRegNo': data.regNo,
        'iptIssuerRep': data.rep
    };

    for (const [id, value] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el && value) el.value = value;
    }
}

// ■画像ファイル選択時のプレビュー処理 (index.htmlで使用)
function previewSeal(input, imgId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById(imgId);
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    }
}