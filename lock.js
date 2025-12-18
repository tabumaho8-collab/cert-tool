/* lock.js - v6.2 (完全版) */

// ▼ パスワード設定
const PASSWORD = "0000"; 
const SESSION_KEY = "access_token"; 

// ■ 認証チェック
function checkAuth() {
    // 1. すでにログイン済みなら、画面を表示して終わり
    if (sessionStorage.getItem(SESSION_KEY) === "allowed") {
        document.body.style.display = "flex"; 
        return;
    }

    // 2. まだなら、少し待ってからパスワードを聞く
    setTimeout(() => {
        const input = prompt("パスワードを入力してください");
        
        if (input === PASSWORD) {
            // 正解！ -> 記録して画面を表示
            sessionStorage.setItem(SESSION_KEY, "allowed");
            document.body.style.display = "flex";
        } else {
            // 間違い -> ログインボタンを表示
            showLoginButton();
        }
    }, 100);
}

// ■ ログインボタン画面を作る
function showLoginButton() {
    document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; width:100%; background:#222; color:#fff;">
            <h2 style="margin-bottom:20px;">🔒 ロックされています</h2>
            <button onclick="location.reload()" style="padding:15px 40px; font-size:16px; font-weight:bold; color:black; background:#00e5ff; border:none; border-radius:30px; cursor:pointer;">
                🔑 ログインする
            </button>
        </div>
    `;
    document.body.style.display = "flex";
}

// ■ ログアウト処理
function logout() {
    if(confirm("ログアウトしますか？")) {
        sessionStorage.removeItem(SESSION_KEY);
        // トップページに戻る
        if (window.location.pathname.indexOf("index.html") === -1) {
             window.location.href = "index.html";
        } else {
             location.reload();
        }
    }
}