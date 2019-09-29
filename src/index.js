import Vue from 'vue'
import inputAutoWidth from './directives/inputAutoWidth'
import './style/main.scss'

import { default as text } from './types/TypeText'
import { default as number } from './types/TypeNumber'
import { default as checkbox } from './types/TypeCheckBox'
import { default as color } from './types/TypeColor'
import { default as colorPicker } from './types/TypeColorPicker'
import { default as colorComponent } from './types/TypeColorComponent'
import { default as colorHue } from './types/TypeColorHue'
import { default as colorAlpha } from './types/TypeColorAlpha'
import { default as select } from './types/TypeSelect'
import { default as slider } from './types/TypeSlider'
import { default as pad } from './types/TypePad'
import { default as windowLink } from './types/TypeWindowLink'

import { default as window } from './components/FuiDenseWindow'

Vue.directive('input-autowidth', inputAutoWidth)

export default {
  name: 'dense',
  types: {
    text,
    number,
    checkbox,
    color,
    'color-picker': colorPicker,
    'color-component': colorComponent,
    'color-hue': colorHue,
    'color-alpha': colorAlpha,
    select,
    slider,
    pad,
    'window-link': windowLink
  },
  windows: {
    window
  }
}
