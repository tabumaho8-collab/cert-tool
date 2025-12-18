/* auth.js - v6.0 (無限ループ防止版) */

// ▼ パスワード設定（数字を変更してください）
const PASSWORD = "0000"; 
const SESSION_KEY = "access_token"; 

// ■ 認証チェック
function checkAuth() {
    // 1. ログイン済みなら画面を表示して終了
    if (sessionStorage.getItem(SESSION_KEY) === "allowed") {
        document.body.style.display = "flex"; 
        return;
    }

    // 2. 未ログインならパスワードを聞く
    const input = prompt("パスワードを入力してください");
    
    if (input === PASSWORD) {
        // 正解！ -> 保存して表示
        sessionStorage.setItem(SESSION_KEY, "allowed");
        document.body.style.display = "flex";
    } else {
        // 不正解 or キャンセル -> ループせずに「ログインボタン」を出す
        showLoginButton();
    }
}

// ■ ログインボタンだけの画面を作る関数
function showLoginButton() {
    // 既存の画面を隠すのではなく、bodyの中身を「ボタンだけ」に書き換える
    document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; background:#f0f2f5; width:100%;">
            <h2 style="color:#555; font-size:18px; margin-bottom:20px;">ログインが必要です</h2>
            <button onclick="location.reload()" style="padding:15px 40px; font-size:16px; font-weight:bold; color:white; background-color:#007bff; border:none; border-radius:30px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                🔑 ログインする
            </button>
        </div>
    `;
    document.body.style.display = "flex"; // ボタン画面を表示
}

// ■ ログアウト処理
function logout() {
    if(confirm("ログアウトしますか？")) {
        sessionStorage.removeItem(SESSION_KEY); // 手形を破棄
        location.reload(); // 再読み込み（パスワード入力画面に戻る）
    }
}

// ■ 状態確認用
function isLoggedin() {
    return sessionStorage.getItem(SESSION_KEY) === "allowed";
}