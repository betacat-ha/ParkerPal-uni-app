<script>
import {
  initVueI18n,
} from '@dcloudio/uni-i18n'
import popup from '../uni-popup/popup.js'
import messages from '../uni-popup/i18n/index.js'

const {
  t,
} = initVueI18n(messages)
/**
 * PopUp 弹出层-对话框样式
 * @description 弹出层-对话框样式
 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
 * @property {string} value input 模式下的默认值
 * @property {string} placeholder input 模式下输入提示
 * @property {boolean} focus input模式下是否自动聚焦，默认为true
 * @property {string} type = [success|warning|info|error] 主题样式
 *  @value success 成功
 * 	@value warning 提示
 * 	@value info 消息
 * 	@value error 错误
 * @property {string} mode = [base|input] 模式、
 * 	@value base 基础对话框
 * 	@value input 可输入对话框
 * @showClose {boolean} 是否显示关闭按钮
 * @property {string} content 对话框内容
 * @property {boolean} beforeClose 是否拦截取消事件
 * @property {number} maxlength 输入
 * @event {Function} confirm 点击确认按钮触发
 * @event {Function} close 点击取消按钮触发
 */

export default {
  name: 'UniPopupDialog',
  mixins: [popup],
  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    // #ifdef VUE2
    value: {
      type: [String, Number],
      default: '',
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type: [Number, String],
      default: '',
    },
    // #endif

    placeholder: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'error',
    },
    mode: {
      type: String,
      default: 'base',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    beforeClose: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: -1,
    },
    focus: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['confirm', 'close', 'update:modelValue', 'input'],
  data() {
    return {
      dialogType: 'error',
      val: '',
    }
  },
  computed: {
    okText() {
      return this.confirmText || t('uni-popup.ok')
    },
    closeText() {
      return this.cancelText || t('uni-popup.cancel')
    },
    placeholderText() {
      return this.placeholder || t('uni-popup.placeholder')
    },
    titleText() {
      return this.title || t('uni-popup.title')
    },
  },
  watch: {
    type(val) {
      this.dialogType = val
    },
    mode(val) {
      if (val === 'input') {
        this.dialogType = 'info'
      }
    },
    value(val) {
      if (this.maxlength != -1 && this.mode === 'input') {
        this.val = val.slice(0, this.maxlength)
      }
      else {
        this.val = val
      }
    },
    val(val) {
      // #ifdef VUE2
      // TODO 兼容 vue2
      this.$emit('input', val)
      // #endif
      // #ifdef VUE3
      // TODO　兼容　vue3
      this.$emit('update:modelValue', val)
      // #endif
    },
  },
  created() {
    // 对话框遮罩不可点击
    this.popup.disableMask()
    // this.popup.closeMask()
    if (this.mode === 'input') {
      this.dialogType = 'info'
      this.val = this.value
      // #ifdef VUE3
      this.val = this.modelValue
      // #endif
    }
    else {
      this.dialogType = this.type
    }
  },
  methods: {
    /**
     * 点击确认按钮
     */
    onOk() {
      if (this.mode === 'input') {
        this.$emit('confirm', this.val)
      }
      else {
        this.$emit('confirm')
      }
      if (this.beforeClose)
        return
      this.popup.close()
    },
    /**
     * 点击取消按钮
     */
    closeDialog() {
      this.$emit('close')
      if (this.beforeClose)
        return
      this.popup.close()
    },
    close() {
      this.popup.close()
    },
  },
}
</script>

<template>
  <view class="uni-popup-dialog">
    <view class="uni-dialog-title">
      <text class="uni-dialog-title-text" :class="[`uni-popup__${dialogType}`]">
        {{ titleText }}
      </text>
    </view>
    <view v-if="mode === 'base'" class="uni-dialog-content">
      <slot>
        <text class="uni-dialog-content-text">
          {{ content }}
        </text>
      </slot>
    </view>
    <view v-else class="uni-dialog-content">
      <slot>
        <input
          v-model="val" class="uni-dialog-input" :maxlength="maxlength" :type="inputType"
          :placeholder="placeholderText" :focus="focus"
        >
      </slot>
    </view>
    <view class="uni-dialog-button-group">
      <view v-if="showClose" class="uni-dialog-button" @click="closeDialog">
        <text class="uni-dialog-button-text">
          {{ closeText }}
        </text>
      </view>
      <view class="uni-dialog-button" :class="showClose ? 'uni-border-left' : ''" @click="onOk">
        <text class="uni-dialog-button-text uni-button-color">
          {{ okText }}
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.uni-popup-dialog {
  width: 300px;
  background-color: #fff;
  border-radius: 11px;
}

.uni-dialog-title {
  /* #ifndef APP-NVUE */
  display: flex;
  justify-content: center;

  /* #endif */
  flex-direction: row;
  padding-top: 25px;
}

.uni-dialog-title-text {
  font-size: 16px;
  font-weight: 500;
}

.uni-dialog-content {
  /* #ifndef APP-NVUE */
  display: flex;
  justify-content: center;
  align-items: center;

  /* #endif */
  flex-direction: row;
  padding: 20px;
}

.uni-dialog-content-text {
  font-size: 14px;
  color: #6C6C6C;
}

.uni-dialog-button-group {
  /* #ifndef APP-NVUE */
  display: flex;

  /* #endif */
  flex-direction: row;
  border-top: 1px solid #f5f5f5;
}

.uni-dialog-button {
  /* #ifndef APP-NVUE */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 45px;

  /* #endif */

  flex: 1;
}

.uni-border-left {
  border-left: 1px solid #f0f0f0;
}

.uni-dialog-button-text {
  font-size: 16px;
  color: #333;
}

.uni-button-color {
  color: #007aff;
}

.uni-dialog-input {
  padding: 0 10px;
  height: 40px;
  font-size: 14px;
  color: #555;
  border: 1px #eee solid;
  border-radius: 5px;
  flex: 1;
}

.uni-popup__success {
  color: #4cd964;
}

.uni-popup__warn {
  color: #f0ad4e;
}

.uni-popup__error {
  color: #dd524d;
}

.uni-popup__info {
  color: #909399;
}
</style>
