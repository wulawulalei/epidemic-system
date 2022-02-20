<template>
  <button
    class="btn"
    @click="handleClick"
    :disabled="disabled"
    :type="nativeType"
    :class="[type ? 'btn-' + type : '', size ? 'btn-' + size : '', { plain, pure, polish }]"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: { String, default: 'medium' },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    disabled: Boolean,
    plain: Boolean,
    pure: Boolean,
    polish: Boolean
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style></style>
