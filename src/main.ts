import { GameManager } from "./GameManager";
import { Mouse } from "./Mouse";
import "./style.css";

window.onload = main;

function main() {
  const joinButton = document.getElementById("joinButton");
  const nameInput = document.getElementById("nameInput") as HTMLInputElement;
  const menu = document.getElementById("start-menu");

  if (!joinButton) throw new Error("Could not find join button");
  if (!nameInput) throw new Error("Could not find name input");
  if (!menu) throw new Error("Could not find menu");

  const gameManager = new GameManager();
  const socket = new WebSocket("ws://127.0.0.1:3000/game");
  const mouse = new Mouse("game_window");
  let playing: boolean = false;

  // When the user clicks the join button, send a join message to the server
  joinButton.addEventListener("click", joinGame);

  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message["State"]) {
      gameManager.drawGame(message["State"]);
    } else if (message["JoinSuccess"]) {
      playing = true;
      menu.style.display = "none";
    } else if (message["PlayerEaten"]) {
      alert("You lost!");
      playing = false;
      menu.style.display = "flex";
    }
  };

  // Send a join message to the server
  function joinGame() {
    const joinMessage = {
      Join: { name: nameInput.value },
    };

    socket.send(JSON.stringify(joinMessage));
  }

  // Send a move message to the server every 10ms
  // if the user is playing and is clicking
  setInterval(() => {
    if (!playing) return;

    if (mouse.click) {
      const message = {
        Move: {
          position: mouse.position,
        },
      };
      socket.send(JSON.stringify(message));
    }
  }, 10);
}
