import Vue from 'vue'

import Toast from './Toast'
import Button from './Button'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

const ToastConstructor = Vue.extend(Toast)

const createPopover = (instance, ComponentConstructor, propsData) => {
  instance = new ComponentConstructor({
    el: document.createElement('div'),
    propsData
  }).$mount()
  document.body.appendChild(instance.$el)
  instance.destroy = function () {
    this.$el.remove()
    this.$destroy()
  }
  return instance
}

export const toast = (content) => {
  const instance = createPopover(null, ToastConstructor, {
    content
  }).showToast()
  setTimeout(() => {
    instance.destroy()
  }, 1000)
}

export { Button }
