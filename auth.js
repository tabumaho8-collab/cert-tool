// auth.js - v5.5 (完全版)

// ▼ パスワード設定（数字を変更してください）
const PASSWORD = "0000"; 
const SESSION_KEY = "access_token"; // 合言葉を保存する場所の名前

// ■ 認証チェック（全ページ共通のエントリポイント）
function checkAuth() {
    // 1. すでにログイン済みかチェック
    if (sessionStorage.getItem(SESSION_KEY) === "allowed") {
        showScreen();
        return;
    }

    // 2. 未ログインならパスワードを聞く
    // (index.html 以外から直接アクセスした場合もここで聞くので便利です)
    const input = prompt("パスワードを入力してください");
    
    if (input === PASSWORD) {
        // 正解！手形を保存して画面を表示
        sessionStorage.setItem(SESSION_KEY, "allowed");
        showScreen();
    } else {
        // 不正解
        alert("パスワードが違います。");
        
        // ツール画面(index以外)にいる場合は、メニューに戻す安全策
        if (window.location.pathname.indexOf("index.html") === -1 && window.location.pathname.slice(-1) !== "/") {
             window.location.href = "index.html";
        } else {
             // メニュー画面ならリロードして再度聞く
             location.reload();
        }
    }
}

// ■ 画面表示処理
function showScreen() {
    // 【重要】block ではなく flex にしないと、横並びレイアウトが崩れます
    document.body.style.display = "flex"; 
}

// ■ ログアウト処理（index.htmlのボタン用）
function logout() {
    if(confirm("ログアウトしますか？")) {
        sessionStorage.removeItem(SESSION_KEY); // 手形を破棄
        window.location.href = "index.html"; // メニューに戻ってリロード
    }
}

// ■ ログイン状態確認（必要に応じて使用）
function isLoggedin() {
    return sessionStorage.getItem(SESSION_KEY) === "allowed";
}