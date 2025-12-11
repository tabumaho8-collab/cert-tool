// ▼ パスワード設定（必ず一番上に書くこと！）
const PASSWORD = "0000"; 

// ■ ログイン処理（index.html用）
function login() {
    let input = prompt("パスワードを入力してください");
    if (input === PASSWORD) {
        // 正解なら「手形」を保存
        sessionStorage.setItem("access_token", "allowed");
        location.reload(); // 画面を再読み込みして表示
    } else {
        alert("パスワードが違います");
    }
}

// ■ チェック処理（各ツール用）
function checkAuth() {
    // 手形（access_token）を持っているか確認
    if (sessionStorage.getItem("access_token") !== "allowed") {
        // 持ってないなら警告して玄関（index.html）へ飛ばす
        alert("ログインしていません。メニュー画面に戻ります。");
        window.location.href = "index.html";
    } else {
        // 持ってるなら画面を表示
        // 【重要】block ではなく flex にしないと、横並びが崩れます
        document.body.style.display = "flex"; 
    }
}

// ■ 既にログイン済みかチェック（index.html用）
function isLoggedin() {
    return sessionStorage.getItem("access_token") === "allowed";
}