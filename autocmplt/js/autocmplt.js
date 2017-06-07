(function() {
  const
    WRAPPER_CLASSNAME = 'autocmplt-wrapper',
    LIST_CLASSNAME = 'autocmplt-list',
    LIST_ITEM_CLASSNAME = 'autocmplt-list-item',
    HIDDEN_CLASSNAME = 'autocmplt-hidden',
    MAX_ITEMS = 5;

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
        this.className = this.className.replace(className, '');
      },
      show() {
        this.removeClass(HIDDEN_CLASSNAME);
      },
      hide() {
        this.addClass(HIDDEN_CLASSNAME);
      }
    });
  }
  
  // function execution delayer
  const delay = (func) => {
    return () => setTimeout(func, 200);
  }

  // generators
  const generateOptionsElement = (data) => {
    let optionsElement = enhanceElement(document.createElement('ul'));

    optionsElement.addClass(LIST_CLASSNAME);

    data.map(item => {
      optionsElement.appendChild(item.element);
    });

    return optionsElement;
  };

  const generateOptionElement = (value) => {
    let optionElement = enhanceElement(document.createElement('li'));
    optionElement.addClass(LIST_ITEM_CLASSNAME);
    optionElement.innerHTML = value;
    optionElement.setAttribute('data-value', value);

    return optionElement;
  }; // generateOptionElement

  const generateOptionsData = (list) => {
    let
      val = '',
      data = Object.keys(list).reduce((data, key) => {
        val = list[key].trim();

        data.push({
          key: val.toLowerCase(),
          value: val,
          element: generateOptionElement(val)
        });

        return data;
      }, []);

    // sort alphabetically
    return data.sort((a, b) => a.value > b.value ? 1 : -1);
  }; // generateOptionsData()
  
  // core
  const autocmplt = (elementSelector, options) => {
    const inputElements = document.querySelectorAll(elementSelector);
    if (!inputElements.length) return;
    
    const init = (element) => {
      const
        inputElement = enhanceElement(element),
        wrapperElement = enhanceElement(document.createElement('div'));

      // wrap input
      wrapperElement.addClass(WRAPPER_CLASSNAME);
      inputElement.parentNode.insertBefore(wrapperElement, inputElement);
      wrapperElement.appendChild(inputElement);

      const optionsData = generateOptionsData(options);
      if (!optionsData.length) return;

      const
        optionsElement = generateOptionsElement(optionsData),
        noMatchElement = generateOptionElement('No match');

      // insert options
      optionsElement.appendChild(noMatchElement);
      wrapperElement.insertBefore(optionsElement, inputElement.nextSibling);

      // hide elements
      optionsElement.hide();
      noMatchElement.hide();

      // handlers
      const handleInputKeyUp = (e) => {
        // TODO: handle arrow keys
        // console.log(e.keyCode || e.which);

        optionsElement.show();

        let
          search = inputElement.value.toLowerCase(),
          counter = 0,
          gotMatch = false,
          regexp = null;

        noMatchElement.hide();

        optionsData.map(item => {
          // remove highlighting
          item.element.innerHTML = item.value;

          if (
            item.key.indexOf(search) >= 0
            &&
            (counter < MAX_ITEMS || !search)
          ) {
            // highlight what's found
            if (search) {
              regexp = new RegExp('(' + search + ')', 'i');
              item.element.innerHTML = item.value.replace(regexp, '<span>$1</span>');
            }

            item.element.show();
            gotMatch = true;
            counter++;
          } else {
            item.element.hide();
          }
        });

        if (!gotMatch) {
          noMatchElement.show();
        }
      }; // handleInputKeyUp()

      const handleOptionClick = (e) => {
        if (e.target !== noMatchElement) {
          const target = e.target.dataset.value ?
            e.target : // click on option itself
            e.target.parentNode; // click on child span

          inputElement.value = target.dataset.value;
        }

        inputElement.focus();
        optionsElement.hide();
      }; // handleOptionClick()

      // listeners
      inputElement.addEventListener('focus', handleInputKeyUp);
      inputElement.addEventListener('blur', delay(() => optionsElement.hide()));
      inputElement.addEventListener('keyup', handleInputKeyUp);
      optionsElement.addEventListener('click', handleOptionClick);
    }
    
    [...inputElements].map(element => init(element));
  }; // autocmplt()
  
  window.autocmplt = autocmplt;
})();
