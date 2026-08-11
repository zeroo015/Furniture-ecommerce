<template>
  <!-- 問答區 -->
  <div class="accordion text-start" :id="`accordion${propsName}`">
    <div class="accordion-item" v-for="(item, i) in propsQA" :key="'payment'+i">
      <h2 class="accordion-header" :id="`heading${propsName+i}`">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${propsName+i}`" aria-expanded="false" :aria-controls="`collapse${propsName+i}`">
          {{ item.Q }}
        </button>
      </h2>
      <div :id="`collapse${propsName+i}`" class="accordion-collapse collapse" :aria-labelledby="`heading${propsName+i}`" :data-bs-parent="`#accordion${propsName}`">
        <div class="accordion-body">
          <!-- 條列式 -->
          <template v-if="typeof(item.ans) === 'object'">
            <ul class="m-0 px-3">
              <li class="mb-2" v-for="(txt, i) in item.ans" :key="i">{{ txt }}</li>
            </ul>
          </template>
          <!-- 簡答式 -->
          <template v-else>{{ item.ans }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propsQA: {
      type: Object,
      required: true
    },
    propsName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion {
  &-item {
    margin-bottom: .75em;
    border-top: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color);
    border-radius: var(--bs-accordion-border-radius);
  }
  &-item:not(:has(.collapsed)) {
    border-color: var(--bs-info);
  }
  &-button:is(.collapsed) {
    border-radius: var(--bs-accordion-border-radius);
  }
  &-button:not(.collapsed) {
    font-weight: 700;
    border-radius: var(--bs-accordion-border-radius) var(--bs-accordion-border-radius) 0 0;
  }
}
</style>
