<template>
    <div id="article" class="body-common">
        <h3 class="article-title">hhhhhh</h3>
        <div class="article-info">
            <span class="author">356465</span>
            |
            <span>2021-02-60</span>
        </div>
        <div class="article-content">
            <p>hjkhljhkljsdf</p>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
#article{
    padding-top: 20px;
    .article-title{
        margin-bottom: 20px;
        transition: color .2s;
        &:hover{
            color:#ff7300;
        }
    }
    .article-info{
        .author{
            color: #ff7300;
        }
    }
    .article-content{
        p{
            margin: 20px 0;
            font-size: 18px;
            line-height: 26px;
            text-indent: 2em;
        }
    }
}
</style>
