export class Mouse {
  public element: HTMLElement;
  public position = { x: 0, y: 0 };
  public click = false;

  constructor(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Could not find element");
    }
    this.element = element;

    this.listenToMouseEvents();
  }

  private listenToMouseEvents() {
    this.element.addEventListener("mousedown", () => {
      this.click = true;
    });

    this.element.addEventListener("mouseup", () => {
      this.click = false;
    });

    this.element.addEventListener("mousemove", (event) => {
      this.position.x = event.offsetX;
      this.position.y = event.offsetY;
    });
  }
}
