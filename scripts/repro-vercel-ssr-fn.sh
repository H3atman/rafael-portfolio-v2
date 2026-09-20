#!/usr/bin/env bash
# Repro loop for: every dynamic route on www.rvcodes.com returns 500
# FUNCTION_INVOCATION_FAILED (/__manifest, /projects/:slug, 404s).
#
# Asserts the Vercel SSR lambda actually contains its handler code.
# RED when `.vercel/output/functions/index.func/` holds only .vc-config.json.
set -uo pipefail
cd "$(dirname "$0")/.."

mkdir -p .vercel
[ -f .vercel/project.json ] || cat > .vercel/project.json <<'EOF'
{"projectId":"prj_local_repro","orgId":"team_local_repro","settings":{"framework":"react-router"}}
EOF

# --standalone makes the CLI materialize the traced files into the .func/
# directory locally. Without it, CLI 59 leaves files out and records them in
# .vc-config.json's filePathMap, so the file-presence assertion below would
# read RED even when the deployment itself is fine.
echo "== vercel build =="
if ! bunx vercel build --yes --standalone > /tmp/repro-vercel-build.log 2>&1; then
  echo "FAIL: vercel build errored"; tail -20 /tmp/repro-vercel-build.log; exit 1
fi
grep -i 'vercelPreset' /tmp/repro-vercel-build.log || true

FN=.vercel/output/functions/index.func
HANDLER=$(node -p "JSON.parse(require('fs').readFileSync('$FN/.vc-config.json','utf8')).handler")

echo "== SSR function =="
echo "handler declared: $HANDLER"
echo "files in $FN (excluding .vc-config.json):"
find "$FN" -type f ! -name '.vc-config.json' | sed 's/^/  /' | head
COUNT=$(find "$FN" -type f ! -name '.vc-config.json' | wc -l)
echo "count: $COUNT"

if [ ! -f "$FN/$HANDLER" ]; then
  echo "RED: declared handler '$HANDLER' is MISSING from the function bundle."
  echo "     Every dynamic request will 500 with FUNCTION_INVOCATION_FAILED."
  exit 1
fi

echo "GREEN: handler present, $COUNT files bundled."
