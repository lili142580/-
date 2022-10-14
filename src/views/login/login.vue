<script setup lang="ts" >
import { onMounted, reactive, ref } from "vue";
import { getAction, postAction } from "../../api/index";
import request from "@/untils/request"
import type { FormInstance } from "ant-design-vue";
import { useRouter } from "vue-router";
interface FormState {
  username: string;
  password: string;
}
const $router = useRouter()
const formState = reactive<FormState>({
  username: "",
  password: "",
});
const formStateRef = ref<FormInstance>();
const methods = {
  async login() {
    let { meta, data } = await postAction('/login', formState);
    if (meta.status == 200) {
      $router.push({ path: '/' })
      localStorage.setItem('token', data.token)
    }
  },
  async submit() {
    try {
      let data = await formStateRef.value?.validateFields();
      methods.login();
    } catch (error) {
      console.log(error);
    }
  },

  reset() {
    formStateRef.value?.resetFields();
  },
};

</script>
<template>
  <div class="login">
    <div class="login-card">
      <div class="title">测试登陆系统</div>
      <a-form :model="formState" name="basic" ref="formStateRef" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }"
        autocomplete="off">
        <a-row :getter="24">
          <a-col :span="24">
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入账号' }]">
              <a-input v-model:value="formState.username" placeholder="请输入用户名" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
              <a-input-password autocomplete="off" v-model:value="formState.password" placeholder="请输入密码" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
              <a-button type="primary" @click="methods.submit">登录</a-button>
              <a-button style="margin-left: 10px" @click="methods.reset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login {
  position: relative;
  height: 100vh;
  background-image: url("@/assets/img/bgimg.png");
  background-size: 100%;

  &-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 30%;
    right: 15%;
    padding: 20px;
    width: 430px;
    height: 630px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);

    .title {
      width: 100%;
      text-align: center;
      font-size: 28px;
      font-weight: 500;
      color: #fff;
      line-height: 24px;
      margin: 31px 0 52px 0;
    }

    .login-image {
      cursor: pointer;
      margin-left: 20px;
      height: 32px;
      width: 100%;
    }
  }
}
</style>
