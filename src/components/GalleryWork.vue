<template>
  <!-- 麵包屑 -->
  <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
    <ol class="breadcrumb default">
      <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">空間靈感</li>
      <li class="breadcrumb-item active" aria-current="page">工作空間</li>
    </ol>
  </nav>
  <!-- 情境推薦 -->
  <div class="topic">
    <div class="box box_dining">
      <div class="pic">
        <img src="https://images.unsplash.com/photo-1686100510242-2521b6f89a68?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        <!-- <img src="https://images.unsplash.com/photo-1721523234710-63c356134fb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""> -->
        <!-- <div class="dot dot_01" @click="goProduct(id1)"></div> -->
        <div class="dot dot_02" @click="goProduct('-P0BGPQWhlTO9_Tmy0jO')"></div>
      </div>
      <div class="title roboto-font text-white text-end pe-5"><span class="text-primary">W</span>orkspace</div>
      <div class="space d-flex flex-column align-items-end">
        <div class="name chiron-goround-tc-font">工作<br>空間</div>
        <div class="caption text-end text-primary pe-3">Step into a well-equipped<br>and flexible co-working community</div>
      </div>
      <div class="Area_PD d-flex justify-content-end">
        <ProductCard :productId="'-Ox1yCkVNWzojp4wOz-r'" :index="'0'"></ProductCard>
        <ProductCard :productId="'-Owzupj8g7ApRx1H7jaf'" :index="'1'"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { mapActions } from 'pinia'
import { useBrowseLogStore } from '@/stores/productBrowse'
export default {
  components: {
    ProductCard
  },
  methods: {
    ...mapActions(useBrowseLogStore, ['goProduct'])
  }
}
</script>

<style lang="scss" scoped>
.topic {
  position: relative;
  margin-bottom: 1.5em;
  .pic {
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
      object-position: 33%;
      border-radius: 0 18em 0 3.5em;
    }
    .dot {
      cursor: pointer;
      width: 1.6em;
      height: 1.6em;
      border: 2px solid rgba(0, 0, 0, 0);
      position: absolute;
      background-color: rgba(190, 208, 211, .75);
      border-radius: 20em;
      transition: all .4s ease-in-out;
      &::after {
        content: "+";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -53%);
        border-radius: 20em;
        font-weight: bold;
        font-family: sans-serif;
        color: var(--bs-primary);
      }
      &:hover {
        transform: scale(1.2);
        border: solid 2px var(--bs-info);
        background-color: rgba(190, 208, 211, .9);
      }
    }
  }
  .title {
    position: absolute;
    top: 90%;
    transform: rotate(-90deg);
    transform-origin: left center;
  }
  .space {
    position: absolute;
    top: 1.5%;
    right: 1.5%;
    gap: .9em;
    .name {
      font-size: 1.25em;
      width: 4em;
      height: 4em;
      color: var(--bs-primary);
      text-align: center;
      align-content: center;
      border: 1px solid var(--bs-primary);
    }
    ::after {
      content: "";
      position: absolute;
      top: 5.5em;
      right: 0;
      width: 1px;
      background-color: var(--bs-primary);
    }
  }
  .Area_PD {
    position: absolute;
    transform: scale(.98);
    transform-origin: right bottom;
    gap: .75em;
  }
}
// 圓點定位
.box_dining {
  .dot_01 { left: 27%; }
  // .dot_02 { left: 52%; }
}
@media screen and (max-width:768px) {
  .topic {
    font-size: 3.75vw;
    .pic {
      img {
        aspect-ratio: 3 / 5;
      }
      .dot {
        font-size: 3.5vw;
      }
    }
    .title {
      left: 1%;
      width: 155%;
      font-size: 5.5em;
      letter-spacing: 0.015em;
    }
    .space {
      top: .5%;
      right: 3%;
      ::after {
        height: 18em;
      }
    }
    .Area_PD {
      bottom: 2%;
      right: 3%;
      transform: scale(.9);
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 94vw; left: 30%; }
    .dot_02 { top: 86vw; left: 80%; }
  }
}
@media screen and (min-width:768px) {
  .topic {
    font-size: 18px;
    .pic {
      img {
        aspect-ratio: 4 / 5;
      }
    }
    .title {
      left: 2.2%;
      width: 111%;
      font-size: 7em;
    }
    .space {
      top: .5%;
      right: 3%;
      ::after {
        height: 25em;
      }
    }
    .Area_PD {
      bottom: 2.5%;
      right: 3%;
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 60.5%; }
    .dot_02 { top: 54.5%; left: 68%; }
  }
}
@media screen and (min-width:1200px) {
  .topic {
    margin-bottom: 3em;
    font-size: 16px;
    .pic {
      img {
        aspect-ratio: 16 / 9;
        border-radius: 0 18em;
      }
    }
    .title {
      top: 92.5%;
      left: 5%;
      width: 56%;
      font-size: 7em;
    }
    .space {
      top: 1.5%;
      right: 1.5%;
      ::after {
        height: 19em;
      }
    }
    .Area_PD {
      bottom: 3.5%;
      right: 1.5%;
    }
  }
  // 圓點定位
  .box_dining {
    .dot_01 { top: 460px; }
    .dot_02 { top: 400px; left: 52%; }
  }
}
</style>
