@echo off
REM ---------------------------------------------------------------------------
REM DMD image factory - daily runner. Double-click this each day until all
REM images are done. It is RESUMABLE: already-finished images are skipped, so
REM re-running never repeats work. It stops on its own when the daily image
REM quota runs out; just run it again tomorrow when the quota resets.
REM ---------------------------------------------------------------------------
cd /d "%~dp0.."

echo.
echo === [1/2] Walk-in closet images (30) ===
python scripts\render_images.py --file closet_image_prompts.md

echo.
echo === [2/2] Product backlog (930) - runs until today's quota stops ===
python scripts\render_images.py --file codex_image_prompts.md

echo.
echo === Done for today. Re-run this file tomorrow when the quota resets. ===
pause
