(function() {
  
  let autocmplt = (elementSelector, options) => {
    const
      LIST_CLASSNAME = 'autocmplt-list',
      LIST_ITEM_CLASSNAME = 'autocmplt-list-item',
      MAX_ITEMS = 5;
    
    // generators
    const generateOptionsElement = (optionsMap) => {
      let optionsElement = document.createElement('ul');
      optionsElement.className = LIST_CLASSNAME;
      
      
      Object.keys(optionsMap).map(key => {
        optionsElement.appendChild(optionsMap[key]);
      });
      
      return optionsElement;
    };
    
    const generateOptionsMap = (optsList) => {
      return Object.keys(optsList).reduce((map, key) => {
        map[ optsList[key] ] = generateOptionElement(optsList[key]);
        
        return map;
      }, {});
    }; // generateOptionsMap()
    
    const generateOptionElement = (opt) => {
      let optionElement = document.createElement('li');
      optionElement.className = LIST_ITEM_CLASSNAME;
      optionElement.innerHTML = opt;
      optionElement.setAttribute('data-value', opt);
      
      return optionElement;
    }
    
    // init
    const init = () => {
      let
        inputElement = document.querySelector(elementSelector),
        optionsMap = generateOptionsMap(options);

      if (!inputElement || !Object.keys(optionsMap).length) return;
      
      let
        optionsElement = generateOptionsElement(optionsMap),
        noMatchElement = generateOptionElement('No match');
      
      // insert elements
      optionsElement.appendChild(noMatchElement);
      inputElement.parentNode.insertBefore(optionsElement, inputElement.nextSibling);
      
      // get default display styles for toggling
      const
        LIST_DISPLAY = optionsElement.style.display,
        LIST_ITEM_DISPLAY = document.querySelector('.' + LIST_ITEM_CLASSNAME).style.display;
      
      // hide elements
      optionsElement.style.display = 'none';
      noMatchElement.style.display = 'none';
      
      // set options list width based on input width
      const
        inputElementRect = inputElement.getBoundingClientRect(),
        inputElementWidth = inputElementRect.right - inputElementRect.left;
      optionsElement.style.width = inputElementWidth + 'px';

      // helpers
      const
        showOptionsElement = () => {
          optionsElement.style.display = LIST_DISPLAY;
        },
        hideOptionsElement = () => {
          optionsElement.style.display = 'none';
        },
        showOptionElement = (el) => {
          el.style.display = LIST_ITEM_DISPLAY;
        },
        hideOptionElement = (el) => {
          el.style.display = 'none';
        },
        delay = (func) => {
          return () => {
            setTimeout(func, 100);
          };
        };
      
      // handlers
      const handleInputKeyUp = (e) => {
        // TODO: handle arrow keys
        // console.log(e.keyCode || e.which);
        
        showOptionsElement();
        
        let
          search = inputElement.value.toLowerCase(),
          counter = 0;
          gotMatch = false;
        
        hideOptionElement(noMatchElement);
        
        if (!search) {
          hideOptionsElement();
          return;
        }
        
        for(let key in optionsMap) {
          if (key.toLowerCase().indexOf(search) >= 0 && counter < MAX_ITEMS) {
            showOptionElement(optionsMap[key]);
            gotMatch = true;
            counter++;
          } else {
            hideOptionElement(optionsMap[key]);
          }
        }
        
        if (!gotMatch) {
          showOptionElement(noMatchElement);
        }
      } // handleInputKeyUp
      
      const handleOptionClick = (e) => {        
        if (e.target !== noMatchElement) {
          inputElement.value = e.target.dataset.value;
        }

        inputElement.focus();
        hideOptionsElement();
      } // handleOptionClick

      // listeners
      inputElement.addEventListener('focus', handleInputKeyUp);
      inputElement.addEventListener('blur', delay(hideOptionsElement));
      inputElement.addEventListener('keyup', handleInputKeyUp);
      optionsElement.addEventListener('click', handleOptionClick);
    }; // init()

    init();
  }; // autocmplt()
  
  window.autocmplt = autocmplt;
})();
