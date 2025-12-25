/* theme.js - 共通テーマ＆ヘッダー管理 */
const THEMES = ['', 'theme-kawaii', 'theme-dark'];

document.addEventListener('DOMContentLoaded', () => {
    // 1. テーマの適用
    const savedTheme = localStorage.getItem('my_tool_theme');
    if (savedTheme && THEMES.includes(savedTheme)) {
        document.body.className = savedTheme;
    }

    // 2. ヘッダーの自動注入
    if (!document.getElementById('global-header')) {
        injectHeader();
    }

    // 3. コンテンツレイアウトのラップ処理 (横並びにするため)
    // noshi.html は main-container を持っているので除外
    // 既にラップ済みでなければ実行
    if (!document.querySelector('.app-layout-wrapper') && !document.querySelector('.main-container')) {
        const editor = document.querySelector('.editor-pane');
        const preview = document.querySelector('.preview-pane');

        if (editor && preview) {
            // ラッパー作成
            const wrapper = document.createElement('div');
            wrapper.className = 'app-layout-wrapper';

            // 親(body)から移動
            // ※スクリプトタグなどを巻き込まないよう、特定の要素だけ移動するのが安全
            editor.parentElement.insertBefore(wrapper, editor);
            wrapper.appendChild(editor);
            wrapper.appendChild(preview);
        }
    }

    updateBtnText();
});

function injectHeader() {
    // ページタイトルを取得 (h2タグなどを想定)
    let subTitle = "";
    const h2 = document.querySelector('h2');
    if (h2) subTitle = "/ " + h2.innerText;

    // noshi.htmlのように既にheaderがある場合はスキップしたかったが、
    // noshi.html側でheader削除して共通JSに任せるように修正する方が綺麗。
    // ここでは単純にprependする。

    const headerHtml = `
    <header id="global-header">
        <h1><a href="index.html" style="text-decoration:none; color:inherit;">社内ツール</a> <span style="font-size:14px; opacity:0.8; font-weight:normal;">${subTitle}</span></h1>
        <div class="header-btns">
            <button onclick="toggleTheme()" id="themeBtn" class="theme-btn">🎨 テーマ変更</button>
        </div>
    </header>
    `;

    // bodyの先頭に挿入
    const div = document.createElement('div');
    div.innerHTML = headerHtml.trim();
    document.body.insertBefore(div.firstElementChild, document.body.firstChild);
}

function toggleTheme() {
    const body = document.body;
    let currentClass = "";
    if (body.classList.contains('theme-kawaii')) currentClass = 'theme-kawaii';
    else if (body.classList.contains('theme-dark')) currentClass = 'theme-dark';

    const currentIndex = THEMES.indexOf(currentClass);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextClass = THEMES[nextIndex];

    body.className = nextClass;
    localStorage.setItem('my_tool_theme', nextClass);
    updateBtnText();
}

function updateBtnText() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;

    const body = document.body;

    // スタイルを一旦リセット (これをしないとKawaiiモードのスタイルが残る)
    btn.style.background = "";
    btn.style.color = "";
    btn.style.border = "";
    btn.style.borderColor = "";
    btn.style.boxShadow = "";
    btn.style.width = "";
    btn.style.minWidth = "";
    btn.style.padding = "";
    btn.style.textShadow = "";

    if (body.classList.contains('theme-kawaii')) {
        btn.innerText = "🎀 かわいく変身 ✨ (次はクール!)";
        // CSSクラス(theme.css)でスタイル指定しているので、ここでは最低限の上書きのみ、またはCSSに任せる
        // ※CSS側で !important をつけているのでJSでのstyle設定は不要かもしれないが、念のため残すなら以下。
        // でもCSSが勝つので、ここはテキスト変更だけで十分な可能性が高い。
        // あえてJSでのスタイル操作を削除し、純粋にCSSクラスの切り替えに依存させるのが綺麗。
    } else if (body.classList.contains('theme-dark')) {
        btn.innerText = "⚡ モード切替 (次:Simple)";
        btn.style.color = "#00e5ff";
        btn.style.borderColor = "#00e5ff";
        btn.style.border = "1px solid #00e5ff"; // 明示的設定
    } else {
        btn.innerText = "✨ モード切替 (次:Kawaii)";
        // デフォルトスタイル (CSSの .theme-btn 定義に戻る)
        btn.style.color = "#fff";
        btn.style.borderColor = "rgba(255,255,255,0.5)";
        btn.style.border = "1px solid rgba(255,255,255,0.3)";
    }
}
