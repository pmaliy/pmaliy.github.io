(function() {
  const
    HIDDEN_CLASSNAME = 'hidden',
    VALUE_CLASSNAME = 'value',
    INPUT_CLASSNAME = 'input';
  
  let state = {};

  // DOM Element decorator
  const enhanceElement = (element, data) => {
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
  };
  
  // DOM event handlers
  
  
  // generators
  const generateCell = (data) => {
    let
      td = document.createElement('td'),
      div = document.createElement('div'),
      val = enhanceElement(document.createElement('div')),
      input = enhanceElement(document.createElement('input'));

    div.className = 'cell';

    val.className = VALUE_CLASSNAME;
    val.innerHTML = data.value;

    input.className = INPUT_CLASSNAME + ' ' + HIDDEN_CLASSNAME;
    input.setAttribute('type', 'text');
    input.setAttribute('value', data.value);

    td.appendChild(div);
    div.appendChild(val);
    div.appendChild(input);

    val.addEventListener('dblclick', e => {
      input.show();
      input.focus();
    });

    input.addEventListener('focus', e => {
      input.value = input.value;
    });

    input.addEventListener('keyup', e => {
      val.html(input.value);

      // Enter key
      if ((e.keyCode || e.which) == 13) {
        input.blur();
        input.hide();
        data.value = input.value;
        // updating textarea with json
        updateTextarea();
      }
    });

    return {
      el: td,
      div,
      input
    }
  };

  const generateRow = (data) => {
    let
      tr = document.createElement('tr'),
      cell;

    return {
      el: tr,
      cells: Object.keys(data).map(key => {
        cell = generateCell(data[key]);
        tr.appendChild(cell.el);

        return cell;
      })
    }
  };

  const generateTbody = (data) => {
    let
      tbody = document.createElement('tbody'),
      row;

    return {
      el: tbody,
      rows: data.map(rowData => {
        row = generateRow(rowData);
        tbody.appendChild(row.el);

        return row;
      })
    }
  };

  const generateThead = (data) => {
    let
      thead = document.createElement('thead'),
      tr = document.createElement('tr'),
      th,
      row = {
        el: tr,
        cells: Object.keys(data[0]).map(key => {
          th = document.createElement('th');
          th.innerHTML = key.split('_').join(' ');
          tr.appendChild(th);

          return th;
        })
      };

    thead.appendChild(row.el);

    return {
      el: thead,
      row: row
    }
  };

  const generateTable = (data) => {
    let
      table = document.createElement('table'),
      thead = generateThead(data),
      tbody = generateTbody(data);

    table.appendChild(thead.el);
    table.appendChild(tbody.el);

    return {
      el: table,
      thead,
      tbody
    }
  };

  generateTextarea = (data) => {
    let textarea = document.createElement('textarea');

    textarea.className = 'output-json';
    textarea.setAttribute('rows', 10);

    return {
      el: textarea
    }
  };

  // json parser
  const generateData = (source) => {
    return source.map(
      ({ name, height, mass, hair_color, skin_color, eye_color, birth_year }) =>
      ({
        name: {
          type: 'string',
          value: name,
          nullValue: ''
        },
        height: {
          type: 'numeric',
          value: height,
          nullValue: 0
        },
        mass: {
          type: 'numeric',
          value: mass,
          nullValue: 0
        },
        hair_color: {
          type: 'string',
          value: hair_color,
          nullValue: 'n/a'
        },
        skin_color: {
          type: 'string',
          value: skin_color,
          nullValue: ''
        },
        eye_color: {
          type: 'string',
          value: eye_color,
          nullValue: ''
        },
        birth_year: {
          type: 'numeric',
          value: birth_year,
          nullValue: 'unknown'
        }
      })
    );
  };

  // outputters
  const outputData = (element) => {
    element.appendChild(state.textarea.el);
  };

  const outputTable = (element) => {
    element.appendChild(state.table.el);
  };

  const updateTextarea = () => {
    state.textarea.el.innerHTML = JSON.stringify(state.data.map(item => {
      return Object.keys(item).reduce((obj, key) => {
        obj[key] = item[key].value;
        return obj;
      }, {});
    }));
  };

  // core
  const dataTable = (selector, source) => {
    const containerElement = document.querySelector(selector);
    
    if (!containerElement || !source.length) return;

    state.data = generateData(source);
    state.table = generateTable(state.data);
    state.textarea = generateTextarea(state.data);

    outputTable(containerElement);
    outputData(containerElement);

    updateTextarea();
  };
  
  window.dataTable = dataTable;
})();
