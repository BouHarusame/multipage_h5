<template>
  <div class="h5-wrapper" >
    <div class="h5-title">客户绑定</div>
    <template v-if="!successMessage">
      <div class="h5-form">
        <ul class="h5-form-box" id="form">
          <li v-for="(item, index) in searchList" :key="index" :class="{'error': item.error}">
            <span :class="item.icon"></span>
            <input type="text"  v-model="item.value" @change="handleCheck(item)" class="input" :placeholder="item.placeholder">
            <span class="error">{{item.errorMessage}}</span>
          </li>
        </ul>
      </div>
      <div class="btn" @click="handleSend">提 交</div>
    </template>
    <div class="message error-message" v-if="errorMessage">
      {{errorMessage}}
    </div>
    <div class="message success-message" v-if="successMessage">
      <div>
        <div class="box">
          <div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: block;">
            <div class="swal2-success-circular-line-left" style="background: #1C3054;">
            </div>
            <span class="swal2-success-line-tip swal2-animate-success-line-tip"></span><span
              class="swal2-success-line-long swal2-animate-success-line-long"></span>
            <div class="swal2-success-ring">
            </div>
            <div class="swal2-success-fix" style="background: #1C3054;">
            </div>
            <div class="swal2-success-circular-line-right" style="background: #1C3054;">
            </div>
          </div>
        </div>
        {{successMessage}}
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '../../api/http'
export default {
  name: 'home',
  data () {
    return {
      errorMessage: '',
      successMessage: '',
      searchList: [{
        value: '',
        icon: 'icon1',
        label: 'compContacts',
        placeholder: '请输入联系人姓名',
        errorMessage: '联系人姓名不能为空',
        error: false
      }, {
        value: '',
        icon: 'icon2',
        label: 'compTel',
        placeholder: '请输入联系人手机号',
        errorMessage: '联系人手机号不能为空',
        error: false
      }, {
        value: '',
        icon: 'icon3',
        label: 'compName',
        placeholder: '请输入公司名称',
        errorMessage: '公司地址不能为空',
        error: false
      }, {
        value: '',
        icon: 'icon4',
        label: 'compAddr',
        placeholder: '请输入公司地址',
        errorMessage: '联系人姓名不能为空',
        error: false
      }, {
        value: '',
        icon: 'icon2',
        label: 'partnerMobile',
        placeholder: '请输入合伙人手机号',
        errorMessage: '请输入正确的合伙人手机号',
        error: false
      }],
      flag: true
    }
  },
  methods: {
    handleCheck (item) {
      if (!item.value) {
        item.error = true
      } else {
        if (item.label === 'partnerMobile') {
          const reg = /^1[3|4|5|7|8][0-9]{9}$/
          if (!reg.test(item.value)) {
            item.error = true
            return
          }
        }
        item.error = false
      }
    },
    handleSend () {
      let isError = false
      this.searchList.forEach((item) => {
        this.handleCheck(item)
        if (item.error) {
          isError = true
        }
      })
      let params = {
        compContacts: '',
        compTel: '',
        compName: '',
        compAddr: '',
        partnerMobile: ''
      }
      for (let key in params) {
        this.searchList.forEach((item) => {
          if (item.label === key) {
            params[key] = item.value
          }
        })
      }
      console.log(this.flag, isError)
      if (this.flag && !isError) {
        console.log(111)
        this.flag = false
        $http('post', '/ap/ex/comp', params)
          .then(res => {
            if (res && res.msg === 'success') {
              this.successMessage = '操作成功'
            }
            if (res && res.msg === 'fail') {
              // this.$message.error(res.verror)
              this.errorMessage = res.verror
              setTimeout(() => {
                this.errorMessage = ''
              }, 3000)
            }
            this.flag = true
            this.loading = false
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h5-wrapper {
  width: 100vw;
  height: 100vh;
  background: #1E3757 url('./images/bg.png');
  background-size: cover;
  overflow: hidden;
}
.message {
  font-size: 18px;
  text-align: center;
}
.error-message {
  position: fixed;
  width: 80vw;
  left: 10vw;
  padding: 10px;
  box-sizing: border-box;
  top: 10vh;
  background: rgba(0,0,0,0.4);
  color: red;
}
.success-message {
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  height: 80vh;
  color: #fde8a7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h5-title {
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 6vh;
}
.h5-form {
  width: 92vw;
  background: rgba(255,255,255,0.1);
  margin: 0 auto;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 6vh 13vw;
}
.h5-form-box {
  display: block;
  padding: 0;
}
.h5-form-box li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #9E9476;
  padding: 5px 5px;
  margin-bottom: 4vh;
  position: relative;
}
.h5-form-box li.error {
  border-color: red;
}
.h5-form-box li.error .error {
  display: block;
}
.input {
  background: transparent;
  border: 0;
  font-size: 16px;
  color: #FDE8A7;
  width: 80%;
  outline: 0;
}
.input::placeholder {
  color: #B7B4AA;
}
.h5-form-box li .error {
  display: none;
  position: absolute;
  bottom: -22px;
  left: 10px;
  color: red;
  font-size: 14px;
}
.icon1{
  display: block;
  width: 16px;
  height: 26px;
  margin-right: 20px;
  background: url('./images/name.png')no-repeat center / 100%;
}
.icon2 {
  display: block;
  width: 14px;
  height: 26px;
  margin-right: 22px;
  background: url('./images/phone.png')no-repeat center / 100%;
}
.icon3 {
  display: block;
  width: 20px;
  height: 26px;
  margin-right: 16px;
  background: url('./images/comp.png')no-repeat center / 100%;
}
.icon4 {
  display: block;
  width: 18px;
  height: 26px;
  margin-right: 18px;
  background: url('./images/addr.png')no-repeat center / 100%;
}
.btn {
  width: 92vw;
  height: 6vh;
  min-height: 40px;
  line-height: 2;
  background: #FDE8A7;
  border-radius: 10px;
  margin: 4vh auto 0;
  text-align: center;
  color: #122C56;
  font-size: 22px;
  font-weight: 500;
}
.swal2-icon {
  width: 80px;
  height: 80px;
  border: 4px solid transparent;
  border-radius: 50%;
  margin: 20px auto 30px;
  padding: 0;
  position: relative;
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
  cursor: default;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }
  .swal2-icon.swal2-success {
    border-color: #a5dc86;
    }
    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {
      border-radius: 50%;
      position: absolute;
      width: 60px;
      height: 120px;
      -webkit-transform: rotate(45deg);
              transform: rotate(45deg); }
      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {
        border-radius: 120px 0 0 120px;
        top: -7px;
        left: -33px;
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
        -webkit-transform-origin: 60px 60px;
                transform-origin: 60px 60px; }
      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {
        border-radius: 0 120px 120px 0;
        top: -11px;
        left: 30px;
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
        -webkit-transform-origin: 0 60px;
                transform-origin: 0 60px; }
    .swal2-icon.swal2-success .swal2-success-ring {
      width: 80px;
      height: 80px;
      border: 4px solid rgba(165, 220, 134, 0.2);
      border-radius: 50%;
      -webkit-box-sizing: content-box;
              box-sizing: content-box;
      position: absolute;
      left: -4px;
      top: -4px;
      z-index: 2; }
    .swal2-icon.swal2-success .swal2-success-fix {
      width: 7px;
      height: 90px;
      position: absolute;
      left: 28px;
      top: 8px;
      z-index: 1;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg); }
    .swal2-icon.swal2-success [class^='swal2-success-line'] {
      height: 5px;
      background-color: #a5dc86;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 2; }
      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {
        width: 25px;
        left: 14px;
        top: 46px;
        -webkit-transform: rotate(45deg);
                transform: rotate(45deg); }
      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {
        width: 47px;
        right: 8px;
        top: 38px;
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg); }

[class^='swal2'] {
  -webkit-tap-highlight-color: transparent; }

@-webkit-keyframes animate-success-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px; }
  54% {
    width: 0;
    left: 1px;
    top: 19px; }
  70% {
    width: 50px;
    left: -8px;
    top: 37px; }
  84% {
    width: 17px;
    left: 21px;
    top: 48px; }
  100% {
    width: 25px;
    left: 14px;
    top: 45px; } }

@keyframes animate-success-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px; }
  54% {
    width: 0;
    left: 1px;
    top: 19px; }
  70% {
    width: 50px;
    left: -8px;
    top: 37px; }
  84% {
    width: 17px;
    left: 21px;
    top: 48px; }
  100% {
    width: 25px;
    left: 14px;
    top: 45px; } }

@-webkit-keyframes animate-success-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px; }
  65% {
    width: 0;
    right: 46px;
    top: 54px; }
  84% {
    width: 55px;
    right: 0;
    top: 35px; }
  100% {
    width: 47px;
    right: 8px;
    top: 38px; } }

@keyframes animate-success-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px; }
  65% {
    width: 0;
    right: 46px;
    top: 54px; }
  84% {
    width: 55px;
    right: 0;
    top: 35px; }
  100% {
    width: 47px;
    right: 8px;
    top: 38px; } }

@-webkit-keyframes rotatePlaceholder {
  0% {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg); }
  5% {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg); }
  12% {
    -webkit-transform: rotate(-405deg);
            transform: rotate(-405deg); }
  100% {
    -webkit-transform: rotate(-405deg);
            transform: rotate(-405deg); } }

@keyframes rotatePlaceholder {
  0% {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg); }
  5% {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg); }
  12% {
    -webkit-transform: rotate(-405deg);
            transform: rotate(-405deg); }
  100% {
    -webkit-transform: rotate(-405deg);
            transform: rotate(-405deg); } }

.swal2-animate-success-line-tip {
  -webkit-animation: animate-success-tip .75s;
          animation: animate-success-tip .75s; }

.swal2-animate-success-line-long {
  -webkit-animation: animate-success-long .75s;
          animation: animate-success-long .75s; }

.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {
  -webkit-animation: rotatePlaceholder 4.25s ease-in;
          animation: rotatePlaceholder 4.25s ease-in; }

</style>
