"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

type Cell = "X" | "O" | null;
type Board = Cell[];

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(b: Board): Cell | "draw" | null {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  if (b.every(Boolean)) return "draw";
  return null;
}

// Minimax — AI is "O", player is "X"
function minimax(board: Board, isMax: boolean, depth: number): number {
  const result = checkWinner(board);
  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "draw") return 0;

  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = isMax ? "O" : "X";
      scores.push(minimax(board, !isMax, depth + 1));
      board[i] = null;
    }
  }
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board): number {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false, 0);
      board[i] = null;
      if (score > best) { best = score; move = i; }
    }
  }
  return move;
}

export default function Game() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true); // true = player (X)
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });
  const [lastWinLine, setLastWinLine] = useState<number[] | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const winner = checkWinner(board);

  const getWinLine = (b: Board) => {
    for (const line of WIN_LINES) {
      const [a, c, d] = line;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
    }
    return null;
  };

  const handleClick = useCallback((idx: number) => {
    if (!playerTurn || board[idx] || winner) return;

    const newBoard = [...board];
    newBoard[idx] = "X";
    const w = checkWinner(newBoard);
    if (w) {
      setBoard(newBoard);
      setLastWinLine(getWinLine(newBoard));
      if (w === "X") setScores(s => ({ ...s, player: s.player + 1 }));
      else if (w === "draw") setScores(s => ({ ...s, draws: s.draws + 1 }));
      return;
    }

    setBoard(newBoard);
    setPlayerTurn(false);

    // AI move with tiny delay for feel
    setTimeout(() => {
      const aiBoard = [...newBoard];
      const move = bestMove(aiBoard);
      if (move !== -1) {
        aiBoard[move] = "O";
        const aiW = checkWinner(aiBoard);
        setBoard(aiBoard);
        if (aiW) {
          setLastWinLine(getWinLine(aiBoard));
          if (aiW === "O") setScores(s => ({ ...s, ai: s.ai + 1 }));
          else if (aiW === "draw") setScores(s => ({ ...s, draws: s.draws + 1 }));
        }
      }
      setPlayerTurn(true);
    }, 320);
  }, [board, playerTurn, winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setLastWinLine(null);
    setAnimKey(k => k + 1);
  };

  const statusMsg = () => {
    if (winner === "X") return "🎉 You won! (wait… how?!)";
    if (winner === "O") return "🤖 AI wins. Told you so.";
    if (winner === "draw") return "🤝 Draw! You survived.";
    if (!playerTurn) return "🤔 AI is thinking…";
    return "👆 Your turn pick a square";
  };

  return (
    <section id="game" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section__tag">Just for fun</span>
          <h2 className="section__title" style={{ marginTop: "0.5rem" }}>Beat me if you can 😏</h2>
          <p style={{ color: "var(--text-color)", fontSize: "0.875rem", maxWidth: 420, margin: "0.5rem auto 0" }}>
            You&apos;re <strong style={{ color: "var(--first-color)" }}>X</strong>. The AI is <strong style={{ color: "var(--title-color)" }}>O</strong>.
            It literally cannot lose. Best you can do is a draw. 🙃
          </p>
        </div>

        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          {/* Score board */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "You (X)", value: scores.player, color: "var(--first-color)" },
              { label: "Draws", value: scores.draws, color: "var(--text-color-light)" },
              { label: "AI (O)", value: scores.ai, color: "var(--title-color)" },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: "0.9rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-color-light)", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem", fontSize: "0.938rem", fontWeight: 600, color: "var(--title-color)", minHeight: "1.5rem" }}>
            {statusMsg()}
          </div>

          {/* Board */}
          <motion.div key={animKey}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "1.5rem" }}>
            {board.map((cell, i) => {
              const isWinCell = lastWinLine?.includes(i);
              return (
                <motion.button key={i}
                  whileHover={!cell && !winner ? { scale: 1.04 } : {}}
                  whileTap={!cell && !winner ? { scale: 0.96 } : {}}
                  onClick={() => handleClick(i)}
                  style={{
                    aspectRatio: "1",
                    borderRadius: "var(--radius-md)",
                    border: `2px solid ${isWinCell ? "var(--first-color)" : "var(--border-color)"}`,
                    background: isWinCell
                      ? "var(--first-color-bg)"
                      : cell ? "var(--container-color)" : "var(--container-color)",
                    cursor: !cell && !winner && playerTurn ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2rem", fontWeight: 700,
                    color: cell === "X" ? "var(--first-color)" : "var(--title-color)",
                    transition: "all 0.2s",
                    boxShadow: isWinCell ? "0 0 0 3px var(--first-color-light)" : "var(--shadow-sm)",
                  }}>
                  <AnimatePresence>
                    {cell && (
                      <motion.span
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                        {cell}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Reset */}
          <div style={{ textAlign: "center" }}>
            <button className="btn btn--ghost" onClick={reset} style={{ fontSize: "0.875rem" }}>
              🔄 New Game
            </button>
          </div>

          {/* Hint */}
          {!winner && playerTurn && board.every(c => !c) && (
            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-color-light)", marginTop: "1rem" }}>
              💡 Tip: Start in the center or a corner for the best chance at a draw.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
