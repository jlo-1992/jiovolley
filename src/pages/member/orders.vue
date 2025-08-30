<template>
  <v-container class="bg-dark">
    <v-card class="mt-1 pa-16 card-memberPage">
      <div>
        <div>
          <h1 class="font-weight-bold text-h4">訂單紀錄</h1>
          <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>
      <v-row class="mt-4 align-center">
        <v-col cols="12">
          <v-card class="pa-4 rounded-lg card-memberPage">
            <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">待取貨的訂單</h2>
            <v-table height="300px" fixed-header striped="even">
              <thead>
                <tr>
                  <th class="text-left">訂單編號</th>
                  <th class="text-left">品項及數量</th>
                  <th class="text-left">總價格</th>
                  <th class="text-left">狀態</th>
                  <th class="text-left">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(social, idx) in socials_upcoming" :key="idx">
                  <td>{{ social.court }}</td>
                  <td>{{ social.time }}</td>
                  <td>{{ social.fee }}</td>
                  <td>{{ social.host }}</td>
                  <td>{{ social.status }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card class="pa-4 rounded-lg mt-8 card-memberPage">
            <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">已完成的訂單</h2>
            <v-table height="300px" fixed-header striped="even">
              <thead>
                <tr>
                  <th class="text-left">訂單編號</th>
                  <th class="text-left">品項及數量</th>
                  <th class="text-left">總價格</th>
                  <th class="text-left">狀態</th>
                  <th class="text-left">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(social, idx) in socials_past" :key="idx">
                  <td>{{ social.court }}</td>
                  <td>{{ social.time }}</td>
                  <td>{{ social.fee }}</td>
                  <td>{{ social.host }}</td>
                  <td>{{ social.status }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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

const socials_past = [
  {
    court: '頂溪國小',
    time: '8/10 18:30~21:00',
    host: 'Frank',
    fee: '280',
    status: '已補登出席',
    note: '冷氣開一小時',
  },
  {
    court: '東吳大學城中校區',
    time: '8/9 13:30~16:30',
    host: 'chih',
    fee: '170',
    status: '出席',
    note: '無冷氣',
  },
  {
    court: '興化國小',
    time: '8/8 19:00~22:00',
    host: 'Yi-Min',
    fee: '110',
    status: '缺席',
    note: '無冷氣',
  },
  {
    court: '藍鵲中和館',
    time: '8/7 19:00~22:00',
    host: 'bee',
    fee: '200',
    status: '出席',
    note: '有冷氣',
  },
  {
    court: '3.14',
    time: '8/6 19:00~22:00',
    host: 'eva',
    fee: '260',
    status: '出席',
    note: '有冷氣',
  },
  {
    court: '3.14',
    time: '8/5 19:00~22:00',
    host: 'wang',
    fee: '250',
    status: '出席',
    note: '有冷氣',
  },
  {
    court: '輕鬆玩',
    time: '8/4 19:15~22:15',
    fee: '240',
    host: 'a-hsien',
    status: '出席',
    note: '有開冷氣',
  },
]
</script>

<style scoped lang="scss">
.bg-dark {
  min-height: 100vh;
}
h1 {
  font-family: 'Huninn', sans-serif;
}

h3 {
  font-family: 'Cooper Black', sans-serif;
}

th {
  font-size: 1.2rem;
}
</style>
