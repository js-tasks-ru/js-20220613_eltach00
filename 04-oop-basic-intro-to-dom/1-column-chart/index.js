export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({
        data = [],
        label = '',
        value = 0,
        formatHeading = data => data,
        link = ''
    } = {}) {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = formatHeading(value);

        this.render();
      }
    
    getTemplate() {
        return `
        <div class="column-chart column-chart_loading">
            <div class="column-chart__title">
              Total ${this.label}${this.getLink()}</div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">${this.value}</div>
              <div data-element="body" class="column-chart__chart">${this.getColumnProps()}</div>
                </div>
                </div>
                `;
      }
    
    render() {
        const element = document.createElement("div"); 
    
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        if (this.data.length) {
            this.element.classList.remove("column-chart_loading");
        }
        this.subElements = this.getSubElements();   
        }
     
    getSubElements() {
        const result = {};
        const elements = this.element.querySelectorAll(['data-element']) ;

        for (const subElement of elements) {
            const name = subElement.dataset.element;
            result[name] = subElement;
        }

        return result;
    }

    getLink() {
        if (this.link) return `<a href="${this.link}" class="column-chart__link">View all</a>`
        return ''
    }

      
    getColumnProps() {
        const maxValue = Math.max(...this.data);
        const scale = this.chartHeight / maxValue;
      
        return this.data.map(item => {
           const percent = ((item / maxValue) * 100).toFixed(0);
            return `<div style="--value:${(Math.floor(item * scale))} "data-tooltip="${percent}%"></div>`;
          } ).join('');
    }

    update(data) {
        this.data = data;
        this.subElements.body = this.getColumnProps();
    }
    
    remove() {
        if (this.element) this.element.remove();
      }
    
    destroy() {
        this.remove();
        this.element = null;
        this.subElements = {};
      }
    }