<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="客户登录" name="customerForm">
        <el-form ref="form" :model="customerForm">
          <el-form-item label="客户名">
            <el-input v-model="customerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="customerForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="customerLogin"
          >客户登录</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="职员登录" name="clerkForm">
        <el-form ref="form" :model="clerkForm">
          <el-form-item label="职员名">
            <el-input v-model="clerkForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="clerkForm.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="clerkLogin">职员登录</el-button>
      </el-tab-pane>
      <el-tab-pane label="职员注册" name="clerkRegisterForm">
        <el-form ref="form" :model="clerkRegisterForm">
          <el-form-item label="职员名">
            <el-input v-model="clerkRegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="clerkRegisterForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="clerkRegister"
          >职员注册</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginRegister",
  data() {
    return {
      activeName: "customerForm",
      customerForm: {
        username: "",
        password: "",
      },
      clerkForm: {
        username: "",
        password: "",
      },
      clerkRegisterForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    customerLogin() {
      if (
        this.customerForm.username === "" ||
        this.customerForm.password === ""
      ) {
        this.$message.error("客户名和密码不能为空！");
        return;
      }
      axios
        .get(
          `customer/login/${this.customerForm.username}/${this.customerForm.password}`
        )
        .then((resp) => {
          if (resp.data.success) {
            this.$message.success("客户登录成功");
            this.$router.replace(
              `operation/customer/${this.customerForm.username}`
            );
          } else {
            this.$message.error("客户登录失败");
          }
        });
    },
    clerkLogin() {
      if (this.clerkForm.username === "" || this.clerkForm.password === "") {
        this.$message.error("职员名和密码不能为空！");
        return;
      }
      axios
        .get(
          `clerk/login/${this.clerkForm.username}/${this.clerkForm.password}`
        )
        .then((resp) => {
          if (resp.data.success) {
            this.$message.success("职员登录成功");
            this.$router.replace(`operation/clerk/${this.clerkForm.username}`);
          } else {
            this.$message.error("职员登录失败");
          }
        });
    },
    clerkRegister() {
      if (this.clerkRegisterForm.username === "" || this.clerkRegisterForm.password === "") {
        this.$message.error("职员名和密码不能为空！");
        return;
      }
      axios
        .post(
          `clerk/register/${this.clerkRegisterForm.username}/${this.clerkRegisterForm.password}`
        )
        .then((resp) => {
          if (resp.data.success) {
            this.$message.success("职员注册成功");
            this.activeName = "clerkForm";
          } else {
            this.$message.success("职员注册失败");
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
