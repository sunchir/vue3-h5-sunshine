<template>
  <div class="login">
    <div class="login-box">
      <h4>Sign Up</h4>
      <Form @submit="onSubmit">
        <CellGroup inset>
          <p>Login, email or phone number</p>
          <Field
            v-model="username"
            name="username"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <p>Password</p>
          <Field
            v-model="password"
            type="password"
            name="password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <!-- <Field
            v-model="result"
            is-link
            readonly
            name="picker"
            label="select name"
            @click="showPicker = true"
          /> -->
          <Popup v-model:show="showPicker" position="bottom">
            <Picker
              :columns-field-names="{ text: 'name' }"
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </Popup>
        </CellGroup>
        <div style="margin: 16px">
          <van-button color="#eb605d" round block type="primary" native-type="submit">
            Login In
          </van-button>
        </div>
        <Divider class="login-divider">or log in with</Divider>

        <van-icon name="wechat" />
        <van-image class="login-bg" width="100vw" fit="contain" :src="bg" />
      </Form>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Form, CellGroup, Field, Divider, Popup, Picker } from 'vant';
  import { loginApi } from '/@/api/sys/user';
  import bg from '/@/assets/loginBg.png';
  const username = ref('');
  const password = ref('');
  const onSubmit = (values) => {
    console.log('submit', values);
    loginApi(values).then((res) => {
      console.log(res);
    });
  };

  const result = ref('');
  const showPicker = ref(false);
  const columns = [
    {
      sn: '5100077',
      name: '张凤寒',
      roleList: [
        { id: 1, name: '主管理员', roleCode: 'zg01', roleGroupId: '1' },
        { id: 6, name: '学校用户', roleCode: '002', roleGroupId: '8' },
        { id: 4, name: '辅导员', roleCode: 'fdy1', roleGroupId: '3' },
        { id: 37, name: '部门工作人员', roleCode: 'n4WE', roleGroupId: '24' },
        { id: 43, name: '学工部工作人员', roleCode: 'qrz9', roleGroupId: '8' },
        { id: 51, name: '问卷管理员', roleCode: 'jH4u', roleGroupId: '27' },
      ],
    },
  ];

  const onConfirm = (value) => {
    result.value = value.name;
    showPicker.value = false;
  };
</script>
<style lang="less" scoped>
  .login {
    background-color: #102840;
    height: 100vh;

    &-box {
      padding: 35px;
      text-align: center;
      color: #fff;
    }

    &-divider {
      padding: 10px 16px 5px 16px;
    }

    &-bg {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    h4 {
      font-size: 24px;
    }

    p {
      font-size: 12px;
      text-align: left;
      padding-left: 20px;
      color: #708193;
      margin-top: 20px;
      margin-bottom: 4px;
    }
  }

  :deep(.van-cell-group) {
    background-color: #102840;
  }

  :deep(.van-cell:after) {
    display: none;
  }

  :deep(.van-cell) {
    background-color: #102840;
    border: 2px solid #708193;
    border-radius: 30px;
    margin: 0px 0px 20px 0px;
    overflow: initial;
  }

  :deep(.van-field__control) {
    color: #fff;
  }

  :deep(.van-field__error-message) {
    position: absolute;
    bottom: -33px;
    color: #eb605d;
    right: 0;
  }
</style>
