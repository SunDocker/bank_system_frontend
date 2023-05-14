<template>
  <div>
    <el-tag>客户名：{{ $route.params.customerName }}</el-tag>
    <br />
    <br />
    <el-tag>余额：{{ balance }}</el-tag>
    <el-tabs v-model="activeName">
      <el-tab-pane label="存款" name="deposit">
        请输入存款金额: &nbsp;<el-input-number
          v-model="depositAmount"
          :min="0"
        />
        <br />
        <br />
        <el-button type="primary" round @click="deposit">确认存款</el-button>
      </el-tab-pane>
      <el-tab-pane label="转账" name="transfer">
        <el-input v-model="transferAccount" placeholder="请输入转账账户" />
        <br />
        <br />
        请输入转账金额: &nbsp;<el-input-number
          v-model="transferAmount"
          :min="0"
        />
        <br />
        <br />
        <el-button type="primary" round @click="transfer">确认转账</el-button>
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
      activeName: "deposit",
      balance: "",
      depositAmount: 0,
      transferAmount: 0,
      transferAccount: "",
    };
  },
  methods: {
    deposit() {
      axios.post(`customer/deposit/${this.depositAmount}`).then((resp) => {
        if (resp.data.success) {
          this.$message.success("存款成功");
          this.getBalance();
        } else {
          this.$message.error("存款失败");
        }
      });
    },
    transfer() {
      if (this.transferAccount === "") {
        this.$message.error("转账账户不能为空！");
        return;
      }
      axios
        .post(
          `customer/transfer/${this.transferAccount}/${this.transferAmount}`
        )
        .then((resp) => {
          if (resp.data.success) {
            this.$message.success("转账成功");
            this.getBalance();
          } else {
            this.$message.error("转账失败");
          }
        });
    },
    getBalance() {
      axios.get("customer/balance").then((resp) => {
        if (resp.data.success) {
          this.balance = resp.data.info;
        } else {
          this.$message.error("发生错误，请退出并重新登录");
        }
      });
    },
    logout() {
      axios.get("customer/logout").then((resp) => {
        if (resp.data.success) {
          this.$message.success("退出成功！");
          this.$router.replace('/')
        } else {
          this.$message.error("发生错误！");
          this.$router.replace('/')
        }
      });
    },
  },
  created() {
    this.getBalance();
  },
};
</script>

<style>
</style>