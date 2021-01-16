class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    const isInput = this.$el.tagName.toLowerCase() === 'input';
    if (typeof text !== 'undefined') {
      if (isInput) {
        this.$el.value = text;
      } else {
        this.$el.textContent = text;
      }
      return this;
    }
    if (isInput) {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: Number.parseInt(parsed[0]),
        col: Number.parseInt(parsed[1])
      }
    }
    return this.data.id
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object
        .entries(styles)
        .forEach(([key, value]) => this.$el.style[key] = value);
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res
    }, {});
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  removeAttr(attr) {
    this.$el.removeAttribute(attr);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (!name) return null;
    if (name.startsWith('data')) {
      const attrName = name.split('-').slice(1).join('-')
      this.$el.dataset[attrName] = value;
    } else {
      this.$el.setAttribute(name, value);
    }
    return this;
  }
}


export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};

