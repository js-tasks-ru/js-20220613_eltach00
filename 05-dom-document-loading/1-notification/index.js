export default class NotificationMessage {
    static activeNot;

    timerId;

    constructor( message = '', {
        duration = 0,
        type = ''
    } = {} ) {

        if (NotificationMessage.activeNot) NotificationMessage.activeNot.remove();
        
        this.message = message;
        this.duration = duration;
        this.type = type;
        
        this.render();
    }

    getTemplate() {
        return  `<div class="notification ${this.type}" style="--value: ${(this.duration/ 1000) + 's'}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">Notification: success!</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;
    }


    show(parent = document.body) {

        parent.append(this.element);

        this.timerId = setTimeout(() => {
            this.remove();
          }, this.duration);

        NotificationMessage.activeNot = this;
    }



    remove() {
        clearTimeout(this.timerId);
        if (this.element) this.element.remove();
      }
    
    destroy() {
        this.remove();
        this.element = null;
        NotificationMessage.activeNot = null;
      }
}
