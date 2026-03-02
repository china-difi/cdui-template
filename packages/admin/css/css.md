> 说明
> 颜色色阶：D (Dark 加暗) L（Light 加亮）XL（再加亮）XD（再加暗）依此类推
> 距离大小：L（放大）S（缩小）XL（再加大）XS（再缩小）依此类推
> 以 margin、border、padding 开头的样式，会自动在其后生成 l、r、t、b 及 x、y 六个组合，如：margin-l（margin-left），margin-x（margin-left + margin-right），border-l（border-left），border-y-color（border-top-color + border-bottom-color）


# margin 外边距

.margin-XXS: 8px;
.margin-XS: 10px;
.margin-S: 12px;
.margin: 16px;
.margin-L: 20px;
.margin-XL: 40px;
.margin-XXL: 60px;

+ .le-800

.margin-XXS: 6px;
.margin-XS: 8px;
.margin-S: 10px;
.margin: 14px;
.margin-L: 16px;
.margin-XL: 30px;
.margin-XXL: 40px;

+ .le-480

.margin-XXS: 4px;
.margin-XS: 6px;
.margin-S: 8px;
.margin: 10px;
.margin-L: 14px;
.margin-XL: 16px;
.margin-XXL: 16px;


# padding 内边距

.padding-XXS: 4px;
.padding-XS: 6px;
.padding-S: 8px;
.padding: 10px;
.padding-L: 14px;
.padding-XL: 24px;
.padding-XXL: 40px;

+ .le-480

.padding-L: 12px;
.padding-XL: 14px;
.padding-XXL: 16px;

# border 边框

.border: 1px;
.border-bold: 2px;
.border-bolder: 4px;


# border-color 边框颜色

.border-c-XXL: #;
.border-c-XL: #;
.border-c-L: #A8A8A8;
.border-c: #383E42;
.border-c-D: #21282D;
.border-c-XD: #;
.border-c-XXD: #;

.border-c-primary: #69F469;
.border-c-secondary: #21282D;
.border-c-error: #814D4D;
.border-c-warn: #;
.border-c-info: #;
.border-c-disabled: #1E252A;

.border-c-active: #ffffff;
.border-c-primary-active: #ffffff;

.border-c-focus: #ffffff;
.border-c-primary-focus: #ffffff;

.border-c-hover: #ffffff;
.border-c-primary-hover: #ffffff;

.border-c-selected: #ffffff;
.border-c-primary-selected: #ffffff;

+ .light


# border-style 边框样式

.border-s-dashed: dashed;
.border-s-dotted: dotted;


# border-radius 圆角边框

.round-XXS: ;
.round-XS: 6px;
.round-S: 10px;
.round: 12px;
.round-L: 14px;
.round-XL: 20px;
.round-XXL: ;

+ .le-480

.round-XS: 6px;
.round-S: 8px;
.round: 10px;
.round-L: 14px;
.round-XL: 16px;


# background-color 背景颜色

.bg-c-XXL: #ffffff;
.bg-c-XL: #2B343A;
.bg-c-L: #21282D;
.bg-c: #1E252A;
.bg-c-D: #151C20;
.bg-c-XD: #131B21;
.bg-c-XXD: #060D12;

.bg-c-primary: #69F469;
.bg-c-secondary: #44B644;
.bg-c-error: #21282D;
.bg-c-warn: #;
.bg-c-info: #;
.bg-c-disabled: #BAD8BA;

.bg-c-active: #ffffff;
.bg-c-primary-active: #ffffff;

.bg-c-focus: #ffffff;
.bg-c-primary-focus: #ffffff;

.bg-c-hover: #;
.bg-c-primary-hover: #69F469;

.bg-c-selected: #ffffff;
.bg-c-primary-selected: #ffffff;

+ .light


# color 字体颜色

.color-XXL: #ffffff;
.color-XL: #;
.color-L: #AAB3CD;
.color: #8693B6;
.color-D: #3D893D;
.color-XD: #1A2C38;
.color-XXD: #000000;

.color-primary: #69F469;
.color-secondary: #2BA8F7;
.color-error: #FF4E4E;
.color-warn: #;
.color-info: #;
.color-disabled: #669766;

.color-active: #ffffff;
.color-primary-active: #69F469;

.color-focus: #ffffff;
.color-primary-focus: #69F469;

.color-hover: #ffffff;
.color-primary-hover: #69F469;

.color-selected: #ffffff;
.color-primary-selected: #69F469;

+ .light


# font-size 字体大小

.font-s-XXS: 12px;
.font-s-XS: 12px;
.font-s-S: 14px;
.font-s: 16px;
.font-s-L: 20px;
.font-s-XL: 22px;
.font-s-XXL: 32px;

+ .le-480

.font-s-S: 12px;
.font-s: 14px;
.font-s-L: 16px;
.font-s-XL: 16px;
.font-s-XXL: 24px;


# font-weight 字体粗细

.font-lighter: lighter;
.font-bold: bold;
.font-bolder: bolder;


# icon-color 图标颜色

.icon-c-XXL: #ffffff;
.icon-c-XL: #;
.icon-c-L: #;
.icon-c: #8693B6;
.icon-c-D: #757D91;
.icon-c-XD: #;
.icon-c-XXD: #;

.icon-c-primary: #69F469;
.icon-c-secondary: #2BA8F7;
.icon-c-error: #FF4E4E;
.icon-c-warn: #;
.icon-c-info: #;
.icon-c-disabled: #669766;

.icon-c-active: #ffffff;
.icon-c-primary-active: #ffffff;

.icon-c-hover: #ffffff;
.icon-c-primary-hover: #69F469;

.icon-c-selected: #ffffff;
.icon-c-primary-selected: #69F469;

+ .light


# icon-size 图标大小

.icon-s-XXS: 12px;
.icon-s-XS: 14px;
.icon-s-S: 16px;
.icon-s: 18px;
.icon-s-L: 20px;
.icon-s-XL: 24px;
.icon-s-XXL: 32px;


# button 按钮

.button { background-color: #21282D; color: #ffffff; border-radius: 14px; outline: none; border: none; min-width: 60px; padding: 4px 8px; }
.button:active { background-color: #1D252B; }
.button:focus { background-color: #1D252B; border: 2px solid #FFFFFF; }
.button:hover { background-color: #2D363B; }
.button:disabled { color: #8693B6; }

.button-primary { background-color: #69F469; color: #21282D; border-radius: 14px; outline: none; border: none; min-width: 60px; padding: 4px 8px; }
.button-primary:active { background-color: #4EE44E; }
.button-primary:focus { border: 2px solid #4EE44E; }
.button-primary:hover { background-color: #9DFF9D; }
.button-primary:disabled { background-color: #BAD8BA; color: #669766; }


# link 链接

.link {}
.link-primary {};
