<template>
  <div class="pt-8 bg-light">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-16 rounded-lg card-memberPage">
          <div>
            <div>
              <h1 class="font-weight-bold text-h4">購物車</h1>
              <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-row class="mt-4 align-center">
            <v-col cols="12">
              <v-card class="pa-4 rounded-lg card-memberPage">
                <!-- <h2 class="mb-4">待出貨的訂單</h2> -->
                <v-table height="450" fixed-header striped="even">
                  <thead>
                    <tr>
                      <th class="text-left">商品名稱</th>
                      <th class="text-left">商品描述</th>
                      <th class="text-left">商品單價</th>
                      <th class="text-left">購買數量</th>
                      <th class="text-left">價格</th>
                      <th class="text-left">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(social, idx) in socials_upcoming" :key="idx">
                      <td>{{ social.court }}</td>
                      <td>{{ social.court }}</td>
                      <td>{{ social.time }}</td>
                      <td>{{ social.fee }}</td>
                      <td>{{ social.host }}</td>
                      <td>{{ social.host }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
              <v-divider class="mt-10 mb-5"></v-divider>
              <div class="text-right">
                <h1>總金額：2,120,526</h1>
                <v-btn size="large" color="#353d42" class="btn mt-5">確認購買</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const socials_upcoming = [
  {
    court: '輕鬆玩',
    time: '8/11 19:15~22:15',
    fee: '240',
    host: 'a-hsien',
    status: '已遞補',
    note: '有開冷氣',
  },
  {
    court: '3.14',
    time: '8/12 19:00~22:00',
    host: 'wang',
    fee: '250',
    status: '已報名',
    note: '有冷氣',
  },
  {
    court: '3.14',
    time: '8/13 19:00~22:00',
    host: 'eva',
    fee: '260',
    status: '已報名',
    note: '有冷氣',
  },
  {
    court: '藍鵲中和館',
    time: '8/14 19:00~22:00',
    host: 'bee',
    fee: '200',
    status: '已報名',
    note: '有冷氣',
  },
  {
    court: '興化國小',
    time: '8/15 19:00~22:00',
    host: 'Yi-Min',
    fee: '110',
    status: '已取消報名',
    note: '無冷氣',
  },
  {
    court: '東吳大學城中校區',
    time: '8/16 13:30~16:30',
    host: 'chih',
    fee: '170',
    status: '候補中',
    note: '無冷氣',
  },
  {
    court: '頂溪國小',
    time: '8/17 18:30~21:00',
    host: 'Frank',
    fee: '280',
    status: '已報名',
    note: '冷氣開一小時',
  },
]
</script>

<style scoped lang="scss">
h1 {
  font-family: 'Huninn', sans-serif;
}

h3 {
  font-family: 'Cooper Black', sans-serif;
}

th {
  font-size: 1.2rem;
}

.bg-light {
  padding-bottom: 155px;
}
</style>
