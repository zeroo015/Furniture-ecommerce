<template>
  <div class="FAQ container-lg">
    <!-- 麵包屑 -->
    <nav class="my-3" aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
      <ol class="breadcrumb default">
        <li class="breadcrumb-item"><router-link to="/" class="link-animated">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">FAQ</li>
      </ol>
    </nav>
    <div class="box row position-relative">
      <!--左側選單列-->
      <div class="box_menu col-3" :class="{'cate-hover': mbToggle}">
        <div class="click_btn2 d-md-none d-flex justify-content-between text-primary" @click.prevent="toggleOpen"><a>問題選單</a><i class="bi bi-plus-circle-fill"></i></div>
        <ul class="list text-start">
          <li class="list_item list_nav" :class="{'cate-hover': isOn === 'paymentQA'}"><a @click.prevent="goto('paymentQA')">付款方式<i></i></a></li>
          <li class="list_item list_nav" :class="{'cate-hover': isOn === 'exchageQA'}"><a @click.prevent="goto('exchageQA')">退換貨<i></i></a></li>
          <li class="list_item list_dropdown" @click.prevent="toggleList" :class="{'cate-hover': isToggle}"><a>清潔保養<i></i></a>
            <div class="list_group">
              <ul class="list" data-title="次選單">
                <li class="list_item list_nav" :class="{'cate-hover': isOn === 'woodQA'}"><a @click.stop="goto('woodQA')">木製</a></li>
                <li class="list_item list_nav" :class="{'cate-hover': isOn === 'fabricQA'}"><a @click.stop="goto('fabricQA')">布料</a></li>
                <li class="list_item list_nav" :class="{'cate-hover': isOn === 'leatherQA'}"><a @click.stop="goto('leatherQA')">皮製</a></li>
                <li class="list_item list_nav" :class="{'cate-hover': isOn === 'metalQA'}"><a @click.stop="goto('metalQA')">金屬</a></li>
              </ul>
            </div>
          </li>
          <li class="list_item list_nav" :class="{'cate-hover': isOn === 'othersQA'}"><a @click.prevent="goto('othersQA')">其他問題<i></i></a></li>
        </ul>
      </div>
      <!-- 右側問答手風琴 -->
      <div class="box_QA col-md-9 ps-md-4 px-3">
        <h5 id="paymentQA" class="text-start">付款方式</h5>
        <QAAccordion :propsQA="payment" :propsName="'Payment'"></QAAccordion>
        <h5 id="exchageQA" class="text-start mt-5">退換貨</h5>
        <QAAccordion :propsQA="exchange" :propsName="'Exchange'"></QAAccordion>
        <h5 id="woodQA" class="text-start mt-5">清潔保養 - 木製</h5>
        <QAAccordion :propsQA="wood" :propsName="'Wood'"></QAAccordion>
        <h5 id="fabricQA" class="text-start mt-5">清潔保養 - 布料</h5>
        <QAAccordion :propsQA="fabric" :propsName="'Fabric'"></QAAccordion>
        <h5 id="leatherQA" class="text-start mt-5">清潔保養 - 皮製</h5>
        <QAAccordion :propsQA="leather" :propsName="'Leather'"></QAAccordion>
        <h5 id="metalQA" class="text-start mt-5">清潔保養 - 金屬</h5>
        <QAAccordion :propsQA="metal" :propsName="'Metal'"></QAAccordion>
        <h5 id="othersQA" class="text-start mt-5">其他問題</h5>
        <QAAccordion :propsQA="others" :propsName="'Others'"></QAAccordion>
      </div>
    </div>
  </div>
</template>

<script>
import QAAccordion from '@/components/QAAccordion.vue'
import { scrollToId } from '@/methods/scroll'
export default {
  data() {
    return {
      isOn: '',
      isToggle: true,
      mbToggle: false,
      payment: [
        { Q: '有提供哪些付款方式？', ans: '提供貨到付款、信用卡刷卡、匯款、台灣PAY、LINE PAY等付款方式。' },
        { Q: '信用卡付款是否提供分期服務？', ans: '指定銀行之信用卡，即可辦理分期零利率。單筆消費滿1萬(含)：可分3期。單筆消費滿3萬(含)：可分6期。以上分期服務皆需全額付清。' },
        { Q: '使用貨到付款有什麼限制嗎？', ans: '請於填寫訂單時，從付款方式中選擇貨到付款。提醒您，使用貨到付款支付的訂單金額不得超過新台幣十萬元。' }
      ],
      exchange: [
        { Q: '多少天內可申請退換貨？', ans: '請務必於取貨後10天內辦理退換貨，申請退換貨後將立即為您辦理相關事宜。如商品已過10天猶豫期，恕無法受理退換貨。' },
        { Q: '退換貨時是否要保留包裝？', ans: '是的，請盡可能將商品、配件和相關包裝盒置入原紙箱中。' },
        { Q: '退換貨是否要自行將商品寄回？', ans: '只要為線上進行退貨申請，完成退貨辦理後，宅配人員將會到府回收商品且不需支付任何費用。' },
        { Q: '申請退換貨後多久後會來收貨？', ans: '我們會儘速安排宅配公司與您聯繫，並於2-5天內前往取貨，請保留退貨單據至收到退款為止。' },
        { Q: '退款時間大概多久？', ans: '商品退回確認無誤後，大約7個工作天(未含假日)會收到退款。' },
        { Q: '原先已辦理退貨商品，後來又決定要保留應該如何處理？', ans: '若宅配尚未收回商品，請立即透過電話客服反應，即可保留商品。若宅配已回收商品，請重新下單。' }
      ],
      wood: [
        {
          Q: '如何清潔保養木製傢俱？',
          ans: [
            '避免放置戶外、陽光直曬、或潮濕處，以防天然實木材質因為乾濕度變化過劇，產生形變、褪色。',
            '放置熱食時須使用隔熱墊、桌巾或玻璃，以免熱氣或油漬損傷木質表面。',
            '平時可用柔軟的靜電除塵布輕輕去除灰塵。',
            '如有污漬，請用中性清潔劑或是小蘇打水去除，再以軟質乾布拭乾清潔。',
            '建議每半年用乾布沾少許木質保養劑（檸檬蠟）輕拭傢俱表面保養一次。',
            '避免使用具揮發性的清潔劑以免傷及表面處理之塗料。'
          ]
        }
      ],
      fabric: [
        {
          Q: '如何清潔保養布製傢俱？',
          ans: [
            '避免放置潮濕或陽光直曬之處，以延長傢俱使用壽命。',
            '可用吸力小的吸塵器，每週吸塵一次，並以毛巾或軟毛刷，輕輕擦拭拂去灰塵。',
            '若潑灑到茶水飲料或污物務必即時處理，可交錯使用稀釋洗碗精或小蘇打水與清水均勻噴灑在沙發布上，再用乾淨棉布按壓吸淨。',
            '若是固定式椅凳類，更換布套時建議一併更換墊裝之泡棉，以延長使用壽命。',
            '可拆卸式沙發布套請以「乾洗」方式處理，以避免混紡材質移染褪色或縮水。'
          ]
        }
      ],
      leather: [
        {
          Q: '如何清潔保養皮製傢俱？',
          ans: [
            '避免放置潮濕、陽光直曬處，勿靠近會發熱的電器商品，如：吹風機、熨斗、電暖器…，以免溫度急遽變化，原皮收縮變硬產生龜裂。',
            '可用吸力小的吸塵器，每週吸塵一次，並以毛巾或軟毛刷，輕輕擦拭拂去灰塵。',
            '若有污漬務必即時處理，請用中性清潔劑去除，再以軟質乾布拭乾。',
            '使用中性清潔劑前請在不明顯處測試，確保無褪色後，再進行大面積處理。',
            '可定期(約6個月)使用皮革專用保養劑，以軟布擦拭家具，擦拭力道不宜過大，以免損傷表皮。'
          ]
        }
      ],
      metal: [
        {
          Q: '如何清潔保養金屬傢俱？',
          ans: [
            '避免放置潮濕或陽光直曬之處，以延長傢俱使用壽命。',
            '每週用乾棉布或超細纖維布輕拭表面，防止灰塵堆積刮傷表層。',
            '遇頑固汙垢請用稀釋的中性洗碗精清理並徹底擦乾。嚴禁使用菜瓜布或強酸強鹼清潔劑，以免破壞保護層導致生鏽。',
            '每隔數月可塗抹薄層金屬保養蠟或汽車蠟，增加防水與抗氧化保護膜。',
            '移動或收納時避免與硬物碰撞、劃傷表層烤漆或鍍膜。'
          ]
        },
        { Q: '金屬零件的耐度好嗎？', ans: '選用國內大廠金屬零件，耐度和品質兼備，若有問題亦提供保固及售後服務。' }
      ],
      others: [
        { Q: '如何挑選適合的沙發？', ans: '挑選時一定要試坐，以最自然輕鬆的姿態坐看看，感受整體坐感。並於選擇時留意背靠墊和坐墊軟硬度是否符合乘坐習慣，背、腰部是否可獲得支撐。' },
        { Q: '木材、板材、塗料是否有做安全檢測?', ans: '為打造安心生活空間，從選材與製程到板材加工皆嚴格把關，選用之實木、合板材來自北美、紐澳等國家，皆屬歐盟 E1 等級，製成品定期送往台灣SGS檢測，其甲醛含量亦落於中華民國國家標準(CNS) F1~F3 等級之間，可放心使用。' }
      ]
    }
  },
  components: {
    QAAccordion
  },
  methods: {
    // 滑動至指定區塊
    goto(id) {
      this.isOn = id
      if (window.innerWidth < 768) {
        this.mbToggle = !this.mbToggle
        // 關閉選單 scroll 的位置才沒誤差
        setTimeout(() => {
          scrollToId(id)
        }, 200)
      } else {
        scrollToId(id)
      }
    },
    toggleOpen() {
      this.mbToggle = !this.mbToggle
    },
    toggleList() {
      this.isToggle = !this.isToggle
    }
  }
}
</script>

<style lang="scss" scoped>
// 左側選單列
.box_menu {
  z-index: 2;
  position: sticky;
  margin: 0;
  font-size: 1rem;
  transition: .15s;
  overflow: hidden;
  box-sizing: border-box;
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-top: .75em;
      font-weight: 600;
      a {
        cursor: pointer;
        text-decoration: none;
        font-size: 1.15em;
      }
    }
  }
  .list_item {
    &.cate-hover > a { color: var(--bs-primary); }
  }
  // 第一層
  .list_dropdown {
    position: relative;
    a {
      // 箭頭
      i { display: inline-block; border-style: solid; border-width: 0.15rem 0.15rem 0 0; width: 0.5rem; height: 0.5rem; transition: .15s; transform-origin: center; color: #333; position: absolute; right: 1.7rem; transform: translateY(70%) rotate(135deg); }
    }
    // 第二層
    .list_group {
      height: 0;
      overflow: hidden;
      .list {
        padding: 0 0 .5em 1.25em;
        a {
          font-size: 1em;
        }
      }
      .list_item {
        font-weight: normal;
      }
    }
    // 開啟第一層
    &.cate-hover {
      > a {
        color: #333;
        i { position: absolute; right: 1.7rem; transform: translateY(120%) rotate(-45deg); }
      }
      .list_group {
        height: auto;
      }
    }
  }
}
@media screen and (min-width:768px) {
  .box_menu {
    height: calc(100vh - 288px);
    top: 80px;
    padding-left: 2rem;
    .list_item {
      &:hover > a { color: var(--bs-primary); }
    }
  }
}
@media screen and (max-width:767px) {
  .box_menu {
    top: 86px;
    margin: 0 auto 1.875rem;
    width: calc(100% - 1.6rem);
    height: 3em;
    border-radius: .5rem;
    background-color: rgba(255,255,255,0.85);
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
    &.cate-hover {
      height: auto;
      padding-bottom: 1em;
      backdrop-filter: blur(8px);
      .click_btn2 {
        border-bottom: 1px solid #e5e5e5;
      }
    }
    ul {
      li {
        padding-left: 1.5rem;
        a {
          font-size: 1.1em;
        }
      }
    }
    // 手機展開按鈕
    .click_btn2 {
      cursor: pointer;
      padding: .75em .5em;
      a {
        text-decoration: none;
        font-size: 1.15em;
        font-weight: 600;
      }
    }
    // 箭頭
    .list_dropdown {
      a i { right: 1.25em;}
      &.cate-hover {
        a  {
          i { right: 1.25em;}
        }
      }
      // 第二層
      .list_group {
        .list_item {
          padding-left: 0;
        }
      }
    }
  }
}
// 右側問答
.box_QA {
  h5 {
    margin-bottom: .75em;
    padding-left: .15em;
  }
}
@media screen and (min-width:768px) {
  .box_QA {
    padding-bottom: 3em;
    border-left: 1px solid #e5e5e5;
  }
}
</style>
