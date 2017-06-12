(function() {
  const
    HIDDEN_CLASSNAME = 'hidden';
  
  // DOM Element decorator
  const enhanceElement = (element) => {
    return Object.assign(element, {
      hasClass(className) {
        return this.className.indexOf(className || null) >= 0;
      },
      addClass(className) {
        if (!this.hasClass(className)) {
          this.className += ' ' + className;
        }
      },
      removeClass(className) {
        this.className = this.className.split(className).join('');
      },
      show() {
        this.removeClass(HIDDEN_CLASSNAME);
      },
      hide() {
        this.addClass(HIDDEN_CLASSNAME);
      },
      html(str) {
        this.innerHTML = str;
      }
    });
  }
  
  // DOM event handlers
  
  
  // DOM elements generators
  const generateCell = (model, head = true) => {
    let cellElement = document.createElement(head ? 'td' : 'th');
    
    if (!head) {
      cellElement.innerHTML = model.value.split('_').join(' ');
      return cellElement;
    }
    
    let inputElement = enhanceElement(document.createElement('input'));
    inputElement.className = 'hidden';
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', model.value);
    
    let valueElement = enhanceElement(document.createElement('div'));
    valueElement.className = 'value';
    valueElement.innerHTML = model.value;
    
    let cellInnerElement = document.createElement('div');
    cellInnerElement.className = 'cell';
    cellInnerElement.appendChild(valueElement);
    cellInnerElement.appendChild(inputElement);
    
    cellElement.appendChild(cellInnerElement);
    
    model.inputElement = inputElement;
    model.valueElement = valueElement;
    
    return cellElement;
  };
  
  const generateRow = (model, head = true) => {
    let
      trElement = document.createElement('tr');
    
    Object.keys(model).map(key => {
      trElement.appendChild(generateCell(model[key], head));
    });
    
    return trElement;
  };
  
  const generateHead = (collection) => {
    let data = Object.keys(collection[0]).map(key => ({ value: key }));
    
    return generateRow(data, false);
  };
  
  const generateTable = (collection) => {
    let
      tableElement = document.createElement('table');
    
    tableElement.appendChild(generateHead(collection));
    
    collection.map(item => {
      tableElement.appendChild(generateRow(item));
    });
    
    return tableElement;
  };
  
  // renderer
  const outputTable = (element, data) => {
    element.innerHTML = '';
    element.appendChild(generateTable(data));
  };
  
  // core
  const outputData = (selector, data) => {
    const containerElement = document.querySelector(selector);
    
    if (!containerElement || !data.length) return;
    
    const collection = data.reduce((arr, item) => {
      arr.push({
        name: { value: item.name },
        height: { value: item.height },
        mass: { value: item.mass },
        hair_color: { value: item.hair_color },
        skin_color: { value: item.skin_color },
        eye_color: { value: item.eye_color },
        birth_year: { value: item.birth_year }
      });
      
      return arr;
    }, []);
    
    outputTable(containerElement, collection);
  };
  
  window.outputData = outputData;
})();
