<template>
  <div>
    <el-tag>职员名：{{ $route.params.clerkName }}</el-tag>
    <br />
    <br />
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看名下账户" name="showAccounts">
        <el-table :data="accounts" stripe style="width: 100%">
          <el-table-column label="ID" prop="id"> </el-table-column>
          <el-table-column label="客户名" prop="username"> </el-table-column>
          <el-table-column label="密码" prop="password"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="创建账户" name="createAccount">
        <el-form ref="form" :model="createAccountForm">
          <el-form-item label="客户名">
            <el-input v-model="createAccountForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="createAccountForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" round @click="createAccount"
          >创建账户</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="删除账户" name="deleteAccount">
        <el-input 
          v-model="deleteAccountID"
          placeholder="请输入要删除的账户 ID"
        />
        <br />
        <br />
        <el-button type="danger" round @click="deleteAccount"
          >删除账户</el-button
        >
      </el-tab-pane>
    </el-tabs>
    <br />
    <el-button type="warning" round @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      accounts: [],
      createAccountForm: {
        username: "",
        password: "",
      },
      activeName: "showAccounts",
      deleteAccountID: "",
    };
  },
  methods: {
    createAccount() {
      if (
        this.createAccountForm.username === "" ||
        this.createAccountForm.password === ""
      ) {
        this.$message.error("客户名和密码不能为空！");
        return;
      }
      axios
        .post(
          `clerk/account/${this.createAccountForm.username}/${this.createAccountForm.password}`
        )
        .then((resp) => {
          if (resp.data.success) {
            this.$message.success("创建账户成功！");
            this.showAccounts();
          } else {
            this.$message.error("创建账户失败！");
          }
        });
    },
    deleteAccount() {
      if (this.deleteAccountID === "") {
        this.$message.error("账户 ID 不能为空！");
        return;
      }
      let PositiveIntegerRegular = /(^[1-9]\d*$)/;
      if (!PositiveIntegerRegular.test(this.deleteAccountID)) {
        this.$message.error("账户 ID 只能是正整数！");
        return;
      }
      axios.delete(`clerk/account/${this.deleteAccountID}`).then((resp) => {
        if (resp.data.success) {
          this.$message.success("删除账户成功！");
          this.showAccounts();
        } else {
          this.$message.error("删除账户失败！");
        }
      });
    },
    showAccounts() {
      axios.get("clerk/account").then((resp) => {
        if (resp.data.success) {
          this.accounts = resp.data.info;
        } else {
          this.$message.error("发生错误，请退出并重新登录");
        }
      });
    },
    logout() {
      axios.get("customer/logout").then((resp) => {
        if (resp.data.success) {
          this.$message.success("退出成功！");
          this.$router.replace("/");
        } else {
          this.$message.error("发生错误！");
          this.$router.replace("/");
        }
      });
    },
  },
  created() {
    this.showAccounts();
  },
};
</script>

<style>
</style>