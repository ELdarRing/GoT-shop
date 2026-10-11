# GoT-shop

Статический сайт Gardens of Tavria. Готовые файлы находятся в `dist/`.

## Публикация в Vercel

1. Загрузите изменения, включая `vercel.json`, в GitHub.
2. В Vercel выберите **Add New → Project** и импортируйте `ELdarRing/GoT-shop`.
3. Оставьте **Root Directory** корнем репозитория (не `dist`).
4. Используйте **Framework Preset: Other**, без команды сборки и установки зависимостей. **Output Directory: dist**. Эти параметры также заданы в `vercel.json`.
5. Нажмите **Deploy**.

Если проект уже импортирован, проверьте Root Directory в настройках проекта и запустите новый деплой после загрузки изменений в GitHub.
