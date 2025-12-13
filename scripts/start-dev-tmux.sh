#!/usr/bin/env bash
# Optional tmux script for use in WSL. It starts services in a tmux session
# and opens the site in the Windows default browser. Auto-shutdown on browser
# close is not reliable cross-OS; use the PowerShell orchestrator for that.

SESSION="diamondz-dev"
ROOT="/mnt/c/Users/krist/krissi-pimpin-pempire-new"

tmux has-session -t $SESSION 2>/dev/null
if [ $? -eq 0 ]; then
  echo "Session $SESSION already exists. Attach with: tmux attach -t $SESSION"
  exit 0
fi

tmux new-session -d -s $SESSION -n mongo
tmux send-keys -t $SESSION:0 "mongod --dbpath $ROOT/data/db" C-m

tmux new-window -t $SESSION -n backend
tmux send-keys -t $SESSION:1 "cd $ROOT/diamondz-playhouse/backend && npm start" C-m

tmux new-window -t $SESSION -n frontend
tmux send-keys -t $SESSION:2 "cd $ROOT/diamondz-playhouse/frontend && npm run start:dev" C-m

tmux new-window -t $SESSION -n stripe
tmux send-keys -t $SESSION:3 "cd $ROOT && stripe listen --forward-to localhost:5000/api/webhooks/stripe" C-m

echo "Opening http://localhost:3000 in Windows default browser..."
cmd.exe /C start http://localhost:3000

echo "tmux session '$SESSION' started. Attach with: tmux attach -t $SESSION"
