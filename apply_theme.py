
import os
import glob
import re

TARGET_DIR = r"c:\Users\user\Desktop\my-tool"
COLOR_TAG = '<link rel="stylesheet" href="theme.css">'
SCRIPT_TAG = '<script src="theme.js"></script>'

def process_files():
    files = glob.glob(os.path.join(TARGET_DIR, "*.html"))
    
    for file_path in files:
        # noshi.htmlとindex.htmlは手動調整済みまたは構造が違うのでスキップ...しないほうがいいか？
        # noshi.htmlは自分でheader書いたので、theme.jsのinjectHeaderと重複するかも。
        # 確認しながら処理する。
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. 誤ってコメントアウトした background: #fff; を復元
        # Powershell置換: -replace 'background: #fff;', '/* background: #fff; */'
        content = content.replace('/* background: #fff; */', 'background: #fff;')
        
        # 2. theme.css の注入
        if 'theme.css' not in content:
            if '</head>' in content:
                content = content.replace('</head>', f'    {COLOR_TAG}\n</head>')
        
        # 3. theme.js の注入
        if 'theme.js' not in content:
            if '</body>' in content:
                content = content.replace('</body>', f'    {SCRIPT_TAG}\n</body>')

        # 4. noshi.html 固有の調整
        # noshi.html は既に header を持っているので、theme.js で二重に追加されないようにしたいが
        # theme.js は id="global-header" がない場合のみ追加する仕様にしたので大丈夫。
        # ただし noshi.html の header に id="global-header" をつける必要がある。
        if os.path.basename(file_path) == "noshi.html":
            if '<header>' in content and 'id="global-header"' not in content:
                 content = content.replace('<header>', '<header id="global-header">')

        if content != original_content:
            print(f"Updating {os.path.basename(file_path)}")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == "__main__":
    process_files()
