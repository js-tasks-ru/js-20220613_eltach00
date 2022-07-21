class Tooltip {

  static instance;
  element;

  constructor() {
    if (Tooltip.instance) return Tooltip.instance

    Tooltip.instance = this;
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  onPointerOver = event => {
    const element = event.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  }

  onPointerOut = () => {
    this.remove();
    document.removeEventListener('pointermove', this.onPointerMove);
  }

  onPointerMove = event => {
    this.moveTooltip(event);
  }

  moveTooltip(event) {
    const shift = 10,
    left = event.clientX + shift,
    top = event.clinetY + shift;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  render(text) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = text;
    document.body.append(this.element);
  }

  remove() {
    if (this.element) this.element.remove();
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
