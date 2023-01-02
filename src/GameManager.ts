type Food = {
  radius: number;
  position: { x: number; y: number };
};

type Player = {
  radius: number;
  position: { x: number; y: number };
  name: string;
};

type GameState = { food: Food[]; players: Player[] };

export class GameManager {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = this.getCanvas();
    this.ctx = this.getContext();
  }

  public clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawText(text: string, x: number, y: number, size: number) {
    this.ctx.textAlign = "center";
    this.ctx.font = `${size}px Arial`;
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.lineWidth = 3;
    this.ctx.strokeText(text, x, y + size / 4);
    this.ctx.lineWidth = 1;
    this.ctx.fillText(text, x, y + size / 4);
  }

  public drawCircle(
    x: number,
    y: number,
    radius: number,
    color: string = "#FF0000"
  ) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  // gets the canvas element from the DOM
  private getCanvas() {
    const element = document.getElementById("game_window");
    if (!element) {
      // create the canvas element
      const canvas = document.createElement("canvas");
      canvas.id = "game_window";
      document.body.appendChild(canvas);
      return canvas;
    }

    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error("Element is not a canvas");
    }

    return element;
  }

  private getContext() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    return ctx;
  }

  public drawGame(state: GameState) {
    this.clearScreen();
    for (const food of state.food) {
      this.drawCircle(food.position.x, food.position.y, food.radius, "#00FF00");
    }
    for (const player of state.players) {
      this.drawCircle(player.position.x, player.position.y, player.radius);
      this.drawText(
        player.name,
        player.position.x,
        player.position.y,
        player.radius
      );
    }
  }
}
