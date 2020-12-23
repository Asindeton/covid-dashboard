/* eslint-disable no-param-reassign */
export default class Keyboard {
  constructor() {
    this.input = document.querySelector('.use-keyboard-input');
    this.input.addEventListener('keydown', (e) => {
      Keyboard.handle(e, this.input);
    });
    this.input.addEventListener('keypress', (e) => {
      Keyboard.handle(e, this.input);
    });
    this.input.addEventListener('keyup', (e) => {
      Keyboard.handleUP(e, this.input);
    });
    this.elements = {
      main: null,
      keysContainer: null,
      controlPanel: null,
      keys: [],
      audioContainer: [
        new Audio('/assets/Sounds/0.mp3'),
        new Audio('/assets/Sounds/1.mp3'),
        new Audio('/assets/Sounds/2.mp3'),
        new Audio('/assets/Sounds/3.mp3'),
        new Audio('/assets/Sounds/4.mp3'),
        new Audio('/assets/Sounds/5.mp3'),
        new Audio('/assets/Sounds/6.mp3'),
        new Audio('/assets/Sounds/7.mp3'),
        new Audio('/assets/Sounds/8.mp3'),
        new Audio('/assets/Sounds/9.mp3'),
        new Audio('/assets/Sounds/10.mp3'),
        new Audio('/assets/Sounds/11.mp3'),
        new Audio('/assets/Sounds/12.mp3'),
        new Audio('/assets/Sounds/13.mp3'),
        new Audio('/assets/Sounds/14.mp3'),
        new Audio('/assets/Sounds/15.mp3'),
        new Audio('/assets/Sounds/16.mp3'),
        new Audio('/assets/Sounds/17.mp3'),
        new Audio('/assets/Sounds/18.mp3'),
        new Audio('/assets/Sounds/19.mp3'),
        new Audio('/assets/Sounds/20.mp3'),
        new Audio('/assets/Sounds/21.mp3'),
      ],
    };
    this.shiftSwitcher = {
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: '^',
      7: '&',
      8: '*',
      9: '(',
      0: ')',
      ',': '<',
      '?': '/',
      '.': '>',
      '!': '1',
      '@': '2',
      '#': '3',
      $: '4',
      '%': '5',
      '^': '6',
      '&': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      '<': ',',
      '>': '.',
      '/': '?',
    };
    this.shiftSwitcherRu = {
      1: '!',
      2: '"',
      3: '№',
      4: ';',
      5: '%',
      6: ':',
      7: '?',
      8: '*',
      9: '(',
      0: ')',
      '!': '1',
      '"': '2',
      '№': '3',
      ';': '4',
      '%': '5',
      ':': '6',
      '?': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      '.': ',',
      ',': '.',
    };
    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };
    this.properties = {
      value: '',
      secondValue: '',
      capsLock: false,
      shift: false,
      langRu: false,
      sound: true,
      cursorPos: 0,
    };
    this.init();
  }

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.controlPanel = document.createElement('div');
    this.elements.controlPanel.innerHTML = `
    <div class="keyboard-cp__element speech-recog">
      <i class="material-icons" title="Start Speech Recognition">mic_none</i>
    </div>
    <div class="keyboard-cp__element sounds-controll">
      <i class="material-icons" title="On/Off volume">volume_up</i>
    </div>
    <div class="keyboard-cp__element hide">
      <i class="material-icons" title="Hide keyboard">keyboard_arrow_down</i>
    </div>`;
    // Setup main elements
    this.elements.controlPanel.classList.add('keyboard-cp');
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.controlPanel);
    this.elements.main.appendChild(this.elements.keysContainer);

    document.body.appendChild(this.elements.main);

    const soundControl = this.elements.controlPanel.querySelector('.sounds-controll');

    soundControl.addEventListener('click', () => {
      this.properties.sound = !this.properties.sound;
      soundControl.classList.toggle('keyboard-cp__element__active');
    });
    const hideControl = this.elements.controlPanel.querySelector('.hide');
    hideControl.addEventListener('click', () => {
      this.close();
    });
    const speechRecognitionControl = this.elements.controlPanel.querySelector('.speech-recog');
    speechRecognitionControl.addEventListener('click', () => {
      speechRecognitionControl.classList.toggle('keyboard-cp__element__active');
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = this.properties.langRu ? 'ru-RU' : 'en-US';
      recognition.start();
      recognition.onresult = (event) => {
        if (event.results.length > 0) {
          const recognishedText = event.results[0][0].transcript;
          this.properties.value += recognishedText;
          this.properties.cursorPos = Keyboard.properties.value.length;
          speechRecognitionControl.classList.toggle('keyboard-cp__element__active');
          this.triggerEvent('oninput');
        }
      };
    });

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(this.properties.value, () => {
          element.selectionEnd = this.properties.cursorPos;
          element.selectionStart = element.selectionEnd;
          const container = (this.properties.value
            + this.properties.secondValue).slice(this.properties.cursorPos);
          this.properties.value = (this.properties.value
            + this.properties.secondValue).slice(0, (this.properties.cursorPos));
          this.properties.secondValue = container;
          element.value = this.properties.value + this.properties.secondValue;
          element.focus();
          element.selectionEnd = this.properties.cursorPos;
          element.selectionStart = element.selectionEnd;
        });
      });
      element.addEventListener('click', () => {
        this.properties.cursorPos = element.selectionStart;
        element.selectionEnd = this.properties.cursorPos;
        element.selectionStart = element.selectionEnd;
        const container = (this.properties.value
          + this.properties.secondValue).slice(this.properties.cursorPos);
        this.properties.value = (this.properties.value
          + this.properties.secondValue).slice(0, (this.properties.cursorPos));
        this.properties.secondValue = container;
      });
    });
  }

  toggleChangeLang() {
    this.properties.langRu = !this.properties.langRu;
    this.properties.capslock = false;
    this.properties.shift = false;

    const cleaner = document.querySelector('.keyboard__keys');
    cleaner.remove();
    const parent = document.querySelector('.keyboard');
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    parent.appendChild(this.elements.keysContainer);
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const KL = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'EN',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'nav-bef', 'space', 'nav-aft',
    ];
    const KLRU = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'RU',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
      'nav-bef', 'space', 'nav-aft',
    ];
    let keyLayout = '';
    if (this.properties.langRu) keyLayout = KLRU;
    else keyLayout = KL;
    // Createfs HTML for an icon
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'enter', '?', 'RU', 'EN'].indexOf(key) !== -1 || (this.properties.langRu && ['.'].indexOf(key) !== -1);

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');
          keyElement.addEventListener('click', () => {
            if (this.properties.cursorPos > 0) this.properties.cursorPos -= 1;
            this.properties.value = this.properties.value.substring(0,
              this.properties.value.length - 1);
            if (this.properties.sound) {
              this.elements.audioContainer[15 + (this.properties.langRu ? 5 : 0)].play();
            }
            this.triggerEvent('oninput');
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            if (this.properties.sound) {
              this.elements.audioContainer[14 + (this.properties.langRu ? 5 : 0)].play();
            }
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key__active');
            keyElement.classList.toggle('keyboard__key--active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;
        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.cursorPos += 1;
            this.properties.value += '\n';
            this.triggerEvent('oninput');
            if (this.properties.sound) {
              this.elements.audioContainer[13 + (this.properties.langRu ? 5 : 0)].play();
            }
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;
        case 'RU':
          keyElement.classList.add('keyboard__key');
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.toggleChangeLang();
            keyElement.classList.toggle('keyboard__key__active');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
                 + (this.properties.langRu ? 5 : 0)].play();
            }
            setTimeout(120, keyElement.classList.toggle('keyboard__key__active'));
          });
          if (this.properties.sound) {
            this.elements.audioContainer[12 + (this.properties.langRu ? 5 : 0)].play();
          }

          break;
        case 'EN':
          keyElement.classList.add('keyboard__key');
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.toggleChangeLang();
            keyElement.classList.toggle('keyboard__key__active');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
              + (this.properties.langRu ? 5 : 0)].play();
            }
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;
        case 'nav-bef':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('navigate_before');
          keyElement.addEventListener('click', () => {
            if (this.properties.cursorPos > 0) this.properties.cursorPos -= 1;
            this.triggerEvent('oninput');
            keyElement.classList.toggle('keyboard__key__active');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
              + (this.properties.langRu ? 5 : 0)].play();
            }
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;
        case 'nav-aft':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('navigate_next');
          keyElement.addEventListener('click', () => {
            if (this.properties.cursorPos
            < (this.properties.value
            + this.properties.secondValue).length) this.properties.cursorPos += 1;
            this.triggerEvent('oninput');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
                 + (this.properties.langRu ? 5 : 0)].play();
            }
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.cursorPos += 1;
            this.properties.value += ' ';
            this.triggerEvent('oninput');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
                 + (this.properties.langRu ? 5 : 0)].play();
            }
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key--advwide', 'keyboard__key--activatable');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            this.toggleShift();
            if (this.properties.sound) {
              this.elements.audioContainer[11 + (this.properties.langRu ? 5 : 0)].play();
            }
            keyElement.classList.toggle('keyboard__key--active');
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.cursorPos += 1;
            this.properties.value += keyElement.innerText;
            this.triggerEvent('oninput');
            if (this.properties.sound) {
              this.elements.audioContainer[Math.floor(Math.random() * 6)
              + (this.properties.langRu ? 5 : 0)].play();
            }
            keyElement.classList.toggle('keyboard__key__active');
            setTimeout(() => { keyElement.classList.toggle('keyboard__key__active'); }, 240);
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    this.elements.keys.forEach((el) => {
      if (el.textContent.length === 1) {
        el.textContent = this.properties.capsLock
          ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
      }
    });
  }

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    let decider;
    if (this.properties.langRu) decider = this.shiftSwitcherRu;
    else decider = this.shiftSwitcher;
    this.elements.keys.forEach((key) => {
      if (Number.isFinite(key.textContent)
       || ([',', '.', '?'].indexOf(key.textContent) !== -1)
       || Number.isFinite(decider[key.textContent])
       || ([',', '.', '?'].indexOf(decider[key.textContent]) !== -1)) {
        key.textContent = decider[key.textContent];
      }
    });
  }

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  }

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  }

  static handle(e, input) {
    const event = new Event('click');
    e.preventDefault();
    document.querySelectorAll('.keyboard__key').forEach((element) => {
      if (element.innerText === e.key) {
        element.dispatchEvent(event);
      }
      if (e.key === 'Enter' && element.outerText === 'keyboard_return') {
        element.dispatchEvent(event);
      }
      if (e.key === 'CapsLock' && element.outerText === 'keyboard_capslock') {
        element.dispatchEvent(event);
      }
      if (e.key === 'Backspace' && element.outerText === 'backspace') {
        element.dispatchEvent(event);
      }
      if (e.key === ' ' && element.outerText === 'space_bar') {
        element.dispatchEvent(event);
      }
      if (e.key === 'ArrowRight' && element.outerText === 'navigate_next') {
        element.dispatchEvent(event);
      }
      if (e.key === 'ArrowLeft' && element.outerText === 'navigate_before') {
        element.dispatchEvent(event);
      }
      if ((e.ctrlKey && e.altKey) && (element.innerText === 'RU' || element.innerText === 'EN')) {
        element.dispatchEvent(event);
      }
    });
    input.dispatchEvent(new Event('input'));
  }

  static handleUP(e, input) {
    const event = new Event('click');
    e.preventDefault();
    document.querySelectorAll('.keyboard__key').forEach((element) => {
      if (e.key === 'CapsLock' && element.outerText === 'keyboard_capslock') {
        element.dispatchEvent(event);
      }
    });
    input.dispatchEvent(new Event('input'));
  }
}
